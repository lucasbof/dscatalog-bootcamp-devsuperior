package com.devsuperior.dscatalog.services;

import java.io.IOException;
import java.io.InputStream;
import java.net.URL;

import org.apache.commons.io.FilenameUtils;
import org.joda.time.Instant;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.amazonaws.services.s3.AmazonS3;
import com.amazonaws.services.s3.model.ObjectMetadata;

@Service
public class S3Service {

	private static Logger LOG = LoggerFactory.getLogger(S3Service.class);

	@Autowired
	private AmazonS3 s3client;

	@Value("${s3.bucket}")
	private String bucketName;

	public URL uploadFile(MultipartFile file) {
		try {
			String originalFileName = file.getOriginalFilename();
			String extension = FilenameUtils.getExtension(originalFileName);
			String filename = Instant.now().toDate().getTime() + "." + extension;
			
			InputStream is = file.getInputStream();
			
			long fileLength = Long.valueOf(is.available());
			String contentType = file.getContentType();
			
			return uploadFile(is, filename, contentType, fileLength);
		}
		catch (IOException e) {
			throw new IllegalArgumentException(e.getMessage());
		}
	}

	private URL uploadFile(InputStream is, String filename, String contentType, long fileLength) {
		ObjectMetadata meta = new ObjectMetadata();
		meta.setContentType(contentType);
		meta.setContentLength(fileLength);
		LOG.info("UPLOAD start");
		s3client.putObject(bucketName, filename, is, meta);
		LOG.info("UPLOAD finish");
		return s3client.getUrl(bucketName, filename);
	}
}
