import React, {useEffect, useState} from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {
  View,
  TextInput,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  Image,
  ScrollView,
} from 'react-native';
import {useFormik} from 'formik';
import * as Yup from 'yup';
import Icon from 'react-native-vector-icons/MaterialIcons';
import LinearGradient from 'react-native-linear-gradient';

import logoImage from '../assets/images/logo.png';
import PinInput from '../components/PinInput';
import {loginUserAction} from '../actions/auth';

const {width, height} = Dimensions.get('window');

const LoginScreen = ({navigation, loginUser}) => {
  const [showPin, setShowPin] = useState(false);

  // Formik setup
  const formik = useFormik({
    initialValues: {userName: '', userPin: ''},
    validationSchema: Yup.object({
      userName: Yup.string().required('Username is required'),
      userPin: Yup.string()
        .matches(/^\d{5}$/, 'Pin must be exactly 5 digits')
        .required('Pin is required'),
    }),
    onSubmit: values => handleSubmitPress(values),
  });

  // Reset form data when navigating back to LoginScreen
  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      formik.resetForm();
    });
    return unsubscribe;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [navigation]);

  const handleSubmitPress = async values => {
    const {userName, userPin} = values;
    loginUser(userName, userPin);
  };

  return (
    <ScrollView style={styles.scrollContainer}>
      <View style={styles.container}>
        {/* Top View with Gradient and Logo */}
        <LinearGradient
          colors={['#1cae97', '#0175b2', '#4b3d91']}
          style={styles.topView}
          start={{x: 0, y: 0}}
          end={{x: 1, y: 1}}>
          <Image source={logoImage} style={styles.logo} />
        </LinearGradient>
        {/* Input Fields View */}
        <View style={styles.inputContainerView}>
          <Text style={styles.logoText}>LOGIN</Text>
          <Text style={styles.label}>Username</Text>
          <View style={styles.inputWrapper}>
            <View style={styles.iconContainer}>
              <LinearGradient
                colors={['#0175b2', '#4b3d91']}
                style={styles.iconGradient}>
                <Icon name="person" size={20} color="#fff" />
              </LinearGradient>
            </View>
            <TextInput
              style={[
                styles.input,
                formik.touched.userName &&
                  formik.errors.userName &&
                  styles.errorInput,
              ]}
              onChangeText={formik.handleChange('userName')}
              onBlur={formik.handleBlur('userName')}
              value={formik.values.userName}
              placeholder="Your Name"
              placeholderTextColor="#767b7f" // Add this line
              returnKeyType="next"
            />
          </View>
          {formik.touched.userName && formik.errors.userName ? (
            <Text style={styles.errorText}>{formik.errors.userName}</Text>
          ) : null}

          <Text style={styles.label}>PIN</Text>
          <View style={styles.inputWrapper}>
            <View style={styles.iconContainer}>
              <LinearGradient
                colors={['#0175b2', '#4b3d91']}
                style={styles.iconGradient}>
                <Icon name="lock" size={20} color="#fff" />
              </LinearGradient>
            </View>

            <PinInput
              pin={formik.values.userPin}
              onPinChange={text => formik.setFieldValue('userPin', text)}
              showPin={showPin}
              onBlur={formik.handleBlur('userPin')}
              error={formik.touched.userPin && formik.errors.userPin} // Pass error prop
            />

            <TouchableOpacity
              style={styles.eyeIconContainer}
              onPress={() => setShowPin(!showPin)}>
              <Icon
                name={showPin ? 'visibility' : 'visibility-off'}
                size={21}
                color="#767b7f"
              />
            </TouchableOpacity>
          </View>

          {formik.touched.userPin && formik.errors.userPin ? (
            <Text style={styles.errorTextWithoutBottomMargin}>
              {formik.errors.userPin}
            </Text>
          ) : null}
          {formik.errors.general ? (
            <Text style={styles.errorTextWithoutBottomMargin}>
              {formik.errors.general}
            </Text>
          ) : null}
          <TouchableOpacity style={styles.button} onPress={formik.handleSubmit}>
            <LinearGradient
              colors={['#0175b2', '#4b3d91']}
              style={styles.buttonGradient}>
              <View style={styles.buttonContent}>
                <Icon
                  name="login"
                  size={20}
                  color="#fff"
                  style={styles.buttonIcon}
                />
                <Text style={styles.buttonText}>LOGIN</Text>
              </View>
            </LinearGradient>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.registerLink}
            onPress={() => navigation.navigate('ChangePinScreen')}>
            <View style={styles.line} />
            <Text style={styles.registerText}>Change Your PIN</Text>
            <View style={styles.line} />
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollContainer: {
    width: width,
  },
  container: {
    flex: 1,
    backgroundColor: '#dcdadb',
    justifyContent: 'flex-start',
    alignItems: 'center',
    height: height,
  },
  topView: {
    width: '100%',
    height: height * 0.42,
    borderBottomLeftRadius: 25,
    borderBottomRightRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    top: 0,
  },
  logo: {
    width: 85,
    height: 85,
    resizeMode: 'contain',
    position: 'absolute',
    top: '12%',
  },
  logoText: {
    fontFamily: '18KhebratMusamimRegular',
    fontSize: 36,
    color: 'black',
    textAlign: 'center',
    paddingBottom: 12,
  },
  inputContainerView: {
    backgroundColor: 'white',
    width: '80%',
    borderRadius: 20,
    paddingVertical: 27,
    paddingHorizontal: 11,
    marginTop: height * 0.25, // Positioned after topView
    elevation: 0,
    shadowColor: 'transparent',
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 13,
    position: 'relative',
  },
  label: {
    color: '#767b7f',
    marginBottom: 2,

    fontFamily: 'Poppins-Medium', // Replace with your preferred font
    fontSize: 12,

    marginLeft: 10,
  },
  input: {
    height: 37,
    flex: 1,
    paddingHorizontal: 40,
    paddingLeft: 47,
    borderRadius: 20,
    backgroundColor: '#f0f0f0',
    fontSize: 9,
    fontFamily: 'Poppins-SemiBold',
    paddingVertical: 0,
    textAlignVertical: 'center',
  },

  iconContainer: {
    position: 'absolute',
    left: 3,
    zIndex: 1,
  },
  iconGradient: {
    borderRadius: 20,
    padding: 5,
  },
  eyeIconContainer: {
    position: 'absolute',
    right: 8,
  },
  button: {
    marginTop: 17,
    borderRadius: 25,
    overflow: 'hidden',
  },
  buttonGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 9.5,
    borderRadius: 25,
  },
  buttonContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  buttonIcon: {
    marginRight: 5,
  },
  buttonText: {
    fontSize: 10,
    fontFamily: 'UbuntuMedium',
    color: '#fff',
  },
  registerLink: {
    paddingHorizontal: 20,
    marginTop: 26,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    paddingBottom: 10,
  },
  line: {
    flex: 1,
    height: 0.8,
    backgroundColor: '#a3a1a1',
    marginHorizontal: 10,
  },
  registerText: {
    color: '#3e519c',
    fontSize: 8,
    fontFamily: 'Poppins-SemiBold',
  },
  errorInput: {
    borderColor: 'red',
    borderWidth: 1,
  },
  errorText: {
    color: 'red',
    fontSize: 12,
    marginTop: -6,
    marginBottom: 10,
    marginLeft: 10,
  },
  errorTextWithoutBottomMargin: {
    color: 'red',
    fontSize: 12,
    marginTop: -6,
    marginLeft: 10,
  },
});

LoginScreen.propTypes = {
  loginUser: PropTypes.func.isRequired,
};

export default connect(null, {
  loginUser: loginUserAction,
})(LoginScreen);
