import React, { useState, useEffect } from 'react';

import {

  View,

  Text,

  TextInput,

  Button,

  TouchableOpacity,

  Image,

  FlatList

} from 'react-native';

import AsyncStorage from '@react-native-async-storage/async-storage';



//////////////////////////////////////////////////

// STYLE CHUNG

//////////////////////////////////////////////////



const screenStyle = {

  flex: 1,

  backgroundColor: 'white'

};



//////////////////////////////////////////////////

// COMPONENTS

//////////////////////////////////////////////////



const CustomTextInput = ({ placeholder, value, onChangeText, secureTextEntry }) => (

  <TextInput

    placeholder={placeholder}

    value={value}

    onChangeText={onChangeText}

    secureTextEntry={secureTextEntry}

    style={{

      borderWidth: 1,

      padding: 12,

      marginVertical: 10,

      borderRadius: 10

    }}

  />

);



const Header = ({ title }) => (

  <Text style={{ fontSize: 18, fontWeight: 'bold', marginVertical: 10 }}>

    {title}

  </Text>

);



//////////////////////////////////////////////////

// SCREENS

//////////////////////////////////////////////////



const SignIn = ({ onLogin, goToForgot }) => {

  const [email, setEmail] = useState('');

  const [password, setPassword] = useState('');



  return (

    <View style={[screenStyle, { padding: 20 }]}>

      <Text style={{ fontSize: 24, fontWeight: 'bold', marginBottom: 20 }}>

        SIGN IN

      </Text>



      <CustomTextInput placeholder="Email" value={email} onChangeText={setEmail} />

      <CustomTextInput placeholder="Password" value={password} onChangeText={setPassword} secureTextEntry />



      <Button

        title="Sign In"

        onPress={async () => {

          await AsyncStorage.setItem('isLoggedIn', 'true');

          onLogin();

        }}

      />



      <TouchableOpacity onPress={goToForgot}>

        <Text style={{ color: 'blue', marginTop: 15 }}>

          Forgot Password?

        </Text>

      </TouchableOpacity>

    </View>

  );

};



const ForgotPassword = ({ goBack }) => (

  <View style={[screenStyle, { padding: 20 }]}>

    <Text style={{ fontSize: 20 }}>Forgot Password Screen</Text>

    <Button title="Back" onPress={goBack} />

  </View>

);



const Home = ({ goToProfile }) => {

  const data = [1, 2, 3, 4, 5];



  return (

    <View style={[screenStyle, { padding: 15 }]}>

      <TextInput

        placeholder="Search..."

        style={{

          borderWidth: 1,

          padding: 10,

          borderRadius: 8

        }}

      />



      <Header title="Top Categories" />

      <FlatList

        horizontal

        data={data}

        keyExtractor={(item) => item.toString()}

        renderItem={({ item }) => <Text style={{ marginRight: 10 }}>Item {item}</Text>}

      />



      <Header title="Popular Items" />

      <FlatList

        horizontal

        data={data}

        keyExtractor={(item) => item.toString()}

        renderItem={({ item }) => <Text style={{ marginRight: 10 }}>Item {item}</Text>}

      />



      <Header title="Sale-off Items" />

      <FlatList

        horizontal

        data={data}

        keyExtractor={(item) => item.toString()}

        renderItem={({ item }) => <Text style={{ marginRight: 10 }}>Item {item}</Text>}

      />



      <Button title="Go to Profile" onPress={goToProfile} />

    </View>

  );

};



const Profile = ({ onLogout }) => {

  return (

    <View style={[screenStyle, { alignItems: 'center', marginTop: 50 }]}>

      <Image

        source={{ uri: 'https://i.pravatar.cc/150' }}

        style={{ width: 100, height: 100, borderRadius: 50 }}

      />



      <Text style={{ marginTop: 10, fontSize: 16 }}>User Name</Text>



      <Button

        title="Sign Out"

        onPress={async () => {

          await AsyncStorage.setItem('isLoggedIn', 'false');

          onLogout();

        }}

      />

    </View>

  );

};



//////////////////////////////////////////////////

// MAIN APP

//////////////////////////////////////////////////



export default function App() {

  const [screen, setScreen] = useState('loading');

  const [isLoggedIn, setIsLoggedIn] = useState(false);



  useEffect(() => {

    const checkLogin = async () => {

      const value = await AsyncStorage.getItem('isLoggedIn');

      const logged = value === 'true';

      setIsLoggedIn(logged);

      setScreen(logged ? 'home' : 'signin');

    };

    checkLogin();

  }, []);



  if (screen === 'loading') return null;



  ////////////////////////////////////////////////

  // ROUTING

  ////////////////////////////////////////////////



  if (!isLoggedIn) {

    if (screen === 'signin') {

      return (

        <SignIn

          onLogin={() => {

            setIsLoggedIn(true);

            setScreen('home');

          }}

          goToForgot={() => setScreen('forgot')}

        />

      );

    }



    if (screen === 'forgot') {

      return <ForgotPassword goBack={() => setScreen('signin')} />;

    }

  }



  if (isLoggedIn) {

    if (screen === 'home') {

      return <Home goToProfile={() => setScreen('profile')} />;

    }



    if (screen === 'profile') {

      return (

        <Profile

          onLogout={() => {

            setIsLoggedIn(false);

            setScreen('signin');

          }}

        />

      );

    }

  }



  return null;

}