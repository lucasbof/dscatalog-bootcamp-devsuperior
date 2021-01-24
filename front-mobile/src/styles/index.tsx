import { StyleSheet, Dimensions } from 'react-native';

const deviceWidth = Dimensions.get('window').width;
const deviceHeight = Dimensions.get('window').height;

const colors = {
    white: "#FFFFFF",
    lightGray: "#F2F2F2",
    mediumGray: "#9E9E9E",
    darkGray: "#263238",
    black: "#000000",
    primary: "#407BEE",
    secondary: "#33569B",
    bluePill: "#407BFF61",
    red: "#DF5753",
    borderGray: "#E1E1E1"
};

const text = StyleSheet.create({
    regular: {
        fontSize: 16,
        fontWeight: '400',
        textAlign: 'center',
        color: colors.mediumGray
    },
    bold: {
        fontSize: 26,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 15,
        color: colors.darkGray
    },
    primaryText: {
        color: colors.white,
        textTransform: 'uppercase',
        fontSize: 14,
        fontWeight: 'bold',
        marginLeft: 20
    },
    productName: {
        fontSize: 16,
        fontWeight: 'bold'
    },
    currency: {
        fontSize: 16,
        fontWeight: '400',
        color: colors.mediumGray
    },
    productPrice: {
        fontSize: 30,
        color: colors.primary,
        fontWeight: 'bold'
    },
    goBackText: {
        fontSize: 18,
        fontWeight: 'bold',
        textTransform: 'uppercase',
        color: colors.darkGray,
        marginLeft: 16
    },
    productDetailsTitle: {
        fontSize: 30,
        fontWeight: 'bold',
        marginTop: 10,
        color: colors.darkGray
    },
    productDescription: {
        fontSize: 16,
        fontWeight: '400',
        color: colors.mediumGray
    },
    loginTitle: {
        fontSize: 30,
        color: colors.darkGray,
        textTransform: 'uppercase',
        marginBottom: 50
    },
    logoutText: {
        color: colors.white
    },
    addButtonText: {
        color: colors.white,
        textTransform: 'uppercase',
        fontWeight: 'bold',

    },
    deleteTxt: {
        textTransform: 'uppercase',
        fontWeight: 'bold',
        color: colors.red
    },
    editText: {
        textTransform: 'uppercase',
        fontWeight: 'bold',
        color: colors.mediumGray
    },
    uploadText: {
        color: colors.white,
        textTransform: 'uppercase',
        fontWeight: 'bold'
    },
    fileSize: {
        color: colors.primary,
        fontSize: 12,
        fontWeight: '300',
        marginVertical: 5,
        padding: 2
    },
    saveBtn: {
        textTransform: 'uppercase',
        fontWeight: 'bold',
        color: colors.white
    }
});

const theme = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        padding: 20
    },
    card: {
        width: '100%',
        height: '100%',
        backgroundColor: colors.white,
        borderRadius: 20,
        alignItems: 'center',
        shadowColor: colors.black,
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        justifyContent: 'space-around',
    },
    draw: {
        width: 313,
        height: 225
    },
    textContainer: {
        paddingHorizontal: 20,
    },
    primaryButton: {
        backgroundColor: colors.primary,
        width: 290,
        height: 50,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderRadius: 10
    },
    arrowContainer: {
        backgroundColor: colors.secondary,
        height: 50,
        width: 50,
        borderTopRightRadius: 10,
        borderBottomRightRadius: 10,
        alignItems: 'center',
        justifyContent: 'center'
    },
    scrollContainer: {
        padding: 10
    },
    productCard: {
        width: '100%',
        backgroundColor: colors.white,
        borderRadius: 10,
        shadowColor: colors.black,
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        marginVertical: 10,
        alignItems: 'center',
        justifyContent: 'space-around',
    },
    productDescription: {
        width: '100%',
        padding: 20,
        borderTopColor: colors.lightGray,
        borderTopWidth: 1,
    },
    priceContainer: {
        marginTop: 10,
        flexDirection: 'row',
    },
    inputContainer: {
        width: '100%',
        height: 60,
        backgroundColor: colors.white,
        borderRadius: 10,
        shadowColor: colors.black,
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        marginVertical: 12.5,
        paddingVertical: 10,
    },
    searchInput: {
        width: '90%',
        height: 40,
        borderBottomWidth: 0.5,
        borderBottomColor: colors.borderGray
    },
    productImg: {
        width: 140,
        height: 140,
        margin: 16
    },
    detailsContainer: {
        backgroundColor: colors.white,
        padding: 20
    },
    detailCard: {
        width: '100%',
        height: '100%',
        backgroundColor: colors.white,
        borderRadius: 20,
        shadowColor: colors.black,
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        justifyContent: 'space-around',
        padding: 20
    },
    productImageContainer: {
        width: '100%',
        borderWidth: 1,
        borderColor: colors.lightGray,
        alignItems: 'center',
        borderRadius: 20
    },
    productImage: {
        width: 220,
        height: 220
    },
    goBackContainer: {
        width: 290,
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 10,
        justifyContent: 'flex-start'
    },
    scrollTextContainer: {
        marginVertical: 20,
        padding: 20,
        borderWidth: 0.5,
        borderRadius: 10,
        borderColor: colors.lightGray
    },
    loginCard: {
        width: '100%',
        height: '100%',
        backgroundColor: colors.white,
        borderRadius: 20,
        alignItems: 'center',
        shadowColor: colors.black,
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        justifyContent: 'center',
    },
    form: {
        marginVertical: 10
    },
    textInput: {
        width: 290,
        height: 50,
        borderWidth: 1,
        borderColor: colors.mediumGray,
        borderRadius: 10,
        padding: 10
    },
    passwordGroup: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 25
    },
    toggle: {
        margin: -40,
    },
    buttonContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-around'
    },
    deleteBtn: {
        width: '48%',
        height: 40,
        borderWidth: 1,
        borderColor: colors.red,
        marginVertical: 10,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 10
    },
    editBtn: {
        width: '48%',
        height: 40,
        borderWidth: 1,
        borderColor: colors.mediumGray,
        marginVertical: 10,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 10,
        marginLeft: 10
    },
    formContainer: {
        width: deviceWidth,
        padding: 20
    },
    formCard: {
        width: '100%',
        height: '90%',
        backgroundColor: colors.white,
        borderRadius: 20,
        padding: 20,
        shadowColor: colors.black,
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        alignItems: 'center',
        justifyContent: 'space-around'
    },
    modalContainer: {
        width: deviceWidth,
        height: deviceHeight,
        backgroundColor: '#00000033',
        alignItems: 'center',
        justifyContent: 'center'
    },
    modalContent: {
        width: 300,
        justifyContent: 'center',
        //alignItems: 'flex-start',
        marginTop: '50%',
        backgroundColor: colors.white,
        borderRadius: 20,
        padding: 20,
        shadowColor: colors.black,
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5
    },
    modalItem: {
        width: '100%',
        backgroundColor: colors.lightGray,
        padding: 10,
        marginVertical: 5,
        borderRadius: 5
    },
    okBtn: {
        backgroundColor: colors.primary,
        width: '100%',
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
    },
    formInput: {
        width: 290,
        height: 50,
        borderWidth: 1,
        borderColor: colors.mediumGray,
        borderRadius: 10,
        padding: 10,
        marginVertical: 15
    },
    textArea: {
        width: '100%',
        maxWidth: '100%',
        borderWidth: 1,
        borderColor: colors.mediumGray,
        height: 200,
        borderRadius: 10,
        padding: 10,
        marginVertical: 15
    },
    selectInput: {
        width: 290,
        height: 50,
        borderWidth: 1,
        borderColor: colors.mediumGray,
        borderRadius: 10,
        padding: 10,
        justifyContent: 'space-between',
        alignItems: 'center',
        flexDirection: 'row'
    },
    uploadBtn: {
        width: '100%',
        height: 40,
        backgroundColor: colors.mediumGray,
        borderRadius: 5,
        alignItems: 'center',
        justifyContent: 'center'
    },
    saveBtn: {
        width: '48%',
        height: 40,
        backgroundColor: colors.primary,
        marginVertical: 10,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 10
    }
});

const nav = StyleSheet.create({
    leftText: {
        color: colors.white,
        fontWeight: 'bold',
        marginLeft: 20,
        fontSize: 18
    },
    drawer: {
        marginRight: 20,
    },
    options: {
        width: deviceWidth,
        height: 120,
        backgroundColor: colors.primary,
        marginTop: 125,
        marginRight: -20,
        padding: 20,
        justifyContent: 'space-between',
    },
    option: {
        paddingVertical: 5,
    },
    textOption: {
        color: colors.white,
        textTransform: 'uppercase',
    },
    textActive: {
        fontWeight: 'bold'
    },
    logoutBtn: {
        width: 60,
        height: 30,
        borderWidth: 1,
        borderColor: colors.white,
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 20
    }
});

const tabbar = StyleSheet.create({
    container: {
        width: deviceWidth,
        height: 80,
        backgroundColor: colors.white,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-around'
    },
    pill: {
        padding: 15,
        backgroundColor: colors.lightGray,
        borderRadius: 20
    },
    pillActive: {
        backgroundColor: colors.bluePill
    },
    pillText: {
        fontWeight: 'bold',
        color: colors.mediumGray
    },
    pillTextActive: {
        color: colors.primary
    },
});

const admin = StyleSheet.create({
    container: {
        padding: 10,
        alignItems: 'center'
    },
    addButton: {
        backgroundColor: colors.primary,
        width: '100%',
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
        margin: 10
    },
});

export { colors, theme, text, nav, tabbar, admin };