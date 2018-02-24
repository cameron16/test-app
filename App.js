import React from 'react';
import { StyleSheet, Text, View, Button, TextInput, Picker, 
  Keyboard, TouchableHighlight, TouchableWithoutFeedback, TouchableOpacity, Dimensions, Alert, Image,
 AppRegistry, ListView} from 'react-native';
import $ from 'jquery';
import DateTimePicker from 'react-native-modal-datetime-picker';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

import {StackNavigator, NavigationActions} from 'react-navigation';

import { CountryDropdown, RegionDropdown } from 'react-country-region-selector';

import ModalSelector from 'react-native-modal-selector'

import { web, phonecall, text, Communications } from 'react-native-communications'; 

import Spinner from 'react-native-loading-spinner-overlay';

// var { full_height, full_width } = Dimensions.get('window');

var full_width = Dimensions.get('window').width;
var full_height = Dimensions.get('window').height;
var dismissKeyboard = require('dismissKeyboard');












class WelcomeScreen extends React.Component{


  render(){
    const {navigate} = this.props.navigation;
    return(
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center'}}>
  
        <Image source={require("./empire_state.jpeg")} /> 

    <Text style = {styles.titleText}>Welcome to Man In The Van</Text>
    <Text style = {styles.sexyText}>Sexiest App in the World</Text> 
      <Button style = {{justifyContent: 'center', alignItems: 'center'}} onPress ={() => navigate('Login') } title = 'I have an Account'/>
      <Button style = {{justifyContent: 'center', alignItems: 'center'}}  onPress ={() => navigate('SignUp') } title = 'Sign Up For The Juice'/>


      </View>

    )
 }

}
class WelcomeNewUserScreen extends React.Component{

  _nextPage(){
    const {navigate} = this.props.navigation;
    previous_page_data = this.props.navigation.state.params
    console.log("WE JUST DID WELCOME NEW USER AND BELOW IS THE USERNAME WE ARE PASSING")
    console.log(previous_page_data.username)
    navigate('UserType', {"username": previous_page_data.username})

  }

  render(){
    return(
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <Image source={require("./thumbs-up.png")} />
    <Text style = {styles.titleText}>So you want to join us!</Text>
    <Text style = {styles.sexyText}>We are glad to have you</Text> 
      <Button style = {{justifyContent: 'center', alignItems: 'center'}} onPress ={() => this._nextPage() } title = 'Continue'/>
      </View>

    )
 }



}

class SignUpScreen extends React.Component{
  constructor(props){
    super(props);
    this.state={
      first_name:'',
      last_name:'',
      phone_number: '',
      username:'',
      password:'',
      re_enter_password:'', 
      
    }
    // this._signUpValid = this._signUpValid.bind(this);
    this._checkSignUp = this._checkSignUp.bind(this);
  }
 


  _checkSignUp(){
    console.log(this.state.username)
    my_user_name = this.state.username
    my_password = this.state.password
    const {navigate} = this.props.navigation;
    console.log("checking if sign up is valid")

    if (this.state.first_name.length == 0){
      Alert.alert(
         'Whats yo name' 
      )
    }
    else if (this.state.last_name.length ==0){
      Alert.alert(
         'Whats yo last name?' 
      )
    }
    else if (this.state.phone_number.length==0){
      Alert.alert(
         'Can I have yo numba?... Can I have it?' 
      )
    }
    else if (this.state.phone_number.length!=10){
      Alert.alert(
         'PSYCH! THATS THE WRONG NUMBA!' 
      )
    }
    else if (this.state.username.length ==0){
      Alert.alert(
         'Please enter your username' 
      )
    }
    else if (this.state.username.length <4){
      Alert.alert(
         'Username must be at least 4 characters' 
      )
    }
    

    else if (this.state.password.length < 4){
      Alert.alert(
         'Password must be at least 4 characters' 
      )
      // return false;
    }
    else if (this.state.password != this.state.re_enter_password){
      Alert.alert(
         'Passwords do not match!' 
      )
      // return false;
    }
    //check if this username already exists in the Database

    
    //PLACEHOLDER PLACEHOLDER PLACEHOLDER PLACEHOLDER
    else{
      fetch("https://maninvanapp-188121.appspot.com/user", {
            method: "POST",
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify({
              "username": this.state.username,
              "password": this.state.password,
              "first_name": this.state.first_name,
              "last_name": this.state.last_name,
              "phone_number":this.state.phone_number,
            })
          }).then(function(response){
            console.log(response);
            console.log(response.status)
            if (response.status >= 400){
              console.log("there was an error")
              Alert.alert(
                'The username you entered is already in use'
              ) 
              // return false;
            } 
            else{
              console.log("this worked")

              /*NOW DO A PUT !!!!!*/



                fetch("https://maninvanapp-188121.appspot.com/user", {
                  method: "PUT",
                  headers: {
                    "Content-Type": "application/json"
                  },
                  body: JSON.stringify({
                    "username": my_user_name,
                    "password": my_password
                  })
                }).then(function(response){
                    console.log(response);
                    console.log(response.status)
                      if (response.status >= 400){
                        console.log("there was an error")
                        Alert.alert(
                          'This username does not match this password'
                        ) 
                        // return false;
                      } 
                      else{




                            //this.state.username
                            console.log("WE JUST SIGNED UP AND BELOW IS THE USERNAME THAT WE ARE PASSING THROUGH")
                            console.log(my_user_name)
                            navigate('WelcomeNewUser',{username: my_user_name})

                            // return true;

                        // return true;
                      }         
                  })
                  .catch(function(error){
                    console.log(error)
                    console.log("catching error message");
                    // Alert.alert(
                    //     'The username you entered is already in use'
                    // )
                  })




            }         
          })
          .catch(function(error){
            console.log(error)
            console.log("catching error message");
            // Alert.alert(
            //     'The username you entered is already in use'
            // )
          })


  }





    // var myBool = this._signUpValid()
    // console.log(myBool)
    // if (myBool == true){
    //   const {navigate} = this.props.navigation;
    //   navigate('WelcomeNewUser',{username: this.state.username})
    // }
    
  }

  render(){
    const {navigate} = this.props.navigation;
    return(
      <KeyboardAwareScrollView>
      <TouchableWithoutFeedback onPress = {Keyboard.dismiss}>
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center'}}>
        <Text style = {styles.titleText}>Welcome to Man In The Van</Text>
        <Text style = {styles.sexyText}>Tell us about yourself</Text>
        <TextInput style = {{height: 50, width: full_width, textAlign: 'center', marginTop: 130}}placeholder="First Name" onChangeText={(first_name) => {this.setState({first_name})}}/>
        <TextInput style = {{height: 50, width: full_width, textAlign: 'center'}}placeholder="Last Name" onChangeText={(last_name) => {this.setState({last_name})}}/>
        <TextInput style = {{height: 50, width: full_width, textAlign: 'center'}}placeholder="Phone Number" keyboardType = 'number-pad' maxLength={10} onChangeText={(phone_number) => {this.setState({phone_number})}}/>
        <TextInput style = {{height: 50, width: full_width, textAlign: 'center'}}placeholder="Username" onChangeText={(username) => {this.setState({username})}}/>
        <TextInput style = {{height: 50, width: full_width, textAlign: 'center'}}placeholder="Password" secureTextEntry={true} onChangeText={(password) => {this.setState({password})}}/>
        <TextInput style = {{height: 50, width: full_width, textAlign: 'center'}}placeholder="Re-enter Password" secureTextEntry={true} onChangeText={(re_enter_password) => {this.setState({re_enter_password})}}/>
        <Button style = {{justifyContent: 'center', alignItems: 'center'}} onPress ={() => this._checkSignUp()} title = 'I Am Prepared For Greatness'/>
    </View>
    </TouchableWithoutFeedback>
    </KeyboardAwareScrollView> 
    )
  }
}




class LoginScreen extends React.Component {
  constructor (props) {
          super(props);
          this.state={
              username:'',
              password:'',

          }
  }
  //check that the persons username and password are in the db
  checkCredentials(){
  
    var my_user_name = this.state.username;


    const {navigate} = this.props.navigation;
    console.log(this.state.username);
    console.log(this.state.password);

    
    //PLACEHOLDER PLACEHOLDER PLACEHOLDER PLACEHOLDER
    fetch("https://maninvanapp-188121.appspot.com/user", {
          method: "PUT",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            "username": this.state.username,
            "password": this.state.password
          })
        }).then(function(response){
            console.log(response);
            console.log(response.status)
              if (response.status >= 400){
                console.log("there was an error")
                Alert.alert(
                  'This username does not match this password'
                ) 
                // return false;
              } 
              else{



                console.log("this worked")
                console.log("WE ARE PASSING USER NAME FROM LOGIN PAGE BELOW")
                console.log(my_user_name)
                navigate('UserType', {username: my_user_name})

                // return true;
              }         
          })
          .catch(function(error){
            console.log(error)
            console.log("catching error message");
            // Alert.alert(
            //     'The username you entered is already in use'
            // )
          })

    }
    
  
  render(){
    return(
            <TouchableWithoutFeedback onPress = {Keyboard.dismiss}>

      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center'}}>
    <Text style = {styles.titleText}>Welcome to Man In The Van</Text>
    <Text style = {styles.sexyText}>Sexiest App in the World</Text>

        <TextInput style = {styles.username} placeholder="Username" onChangeText={(username) => {this.setState({username})}}/>
        <TextInput style = {styles.password} placeholder="Password" secureTextEntry={true} onChangeText={(password) => {this.setState({password})}}/>
    <Button
      onPress={() => this.checkCredentials()} 
      title="Login"/>
  </View>
        </TouchableWithoutFeedback>

      );
  }

}


class UserTypeScreen extends React.Component {
  



  _logoutButtonPressed(){
    /*PLACEHOLDER PLACEHOLDER PLACEHOLDER PLACEHOLDER*/
    const {navigate} = this.props.navigation;
    //navigate('Login')
    const resetAction = NavigationActions.reset({
      index: 1,
      actions: [
          NavigationActions.navigate({ routeName: 'Welcome'}),
          NavigationActions.navigate({ routeName: 'Login'})
        ]
      })
    this.props.navigation.dispatch(resetAction)

  }


  _getMoverInfo(){
    
    const {navigate} = this.props.navigation;

    var myArray =[];
        fetch("https://maninvanapp-188121.appspot.com/jobs", {

            method: "GET",
            headers: {
              "Content-Type": "application/json"
            },
          }).then(function(response){
            console.log(response);
            console.log(response.status)
            if (response.status >= 400){
              console.log("there was an error")
              Alert.alert(
                'We are experiencing technical difficulties on user type screen. Please try again'
              ) 
              // return false;
            } 
            else{
              console.log("this worked on the hauling side")

              // console.log(response)
              // console.log(typeof(response)) 
              // console.log(response._bodyInit)
              // console.log(typeof(response._bodyInit))
              // var k = response._bodyInit.replace(/\\/g, ""); 
              // console.log(k)

              var myResponseBody = response._bodyInit.replace(/\\/g, "");
              console.log("MY RESPONSE BODY BELOW")
              console.log(myResponseBody)
              myArray = []
              splitResponse = myResponseBody.split('"_id"');
              for (i = 1; i<splitResponse.length; i++){
                console.log(i)
                thisObject = '{"key": ' + i + ', "_id"' + splitResponse[i];//k.split("_id")[i]
                thisObject = thisObject.substring(0, thisObject.length-3)
                console.log("THIS OBJECT BELOW")
                console.log(thisObject);
                thisObjectJson = JSON.parse(thisObject)
                thisObjectJson["toPrint"] = "Max Price: " +thisObjectJson.max_price + " --- Finish By: " + thisObjectJson.finish_by;
                console.log(thisObjectJson);
                myArray.push(thisObjectJson)
              }
              
              console.log(myArray);
              console.log("GOING FROM USER TYPE SCREEN TO HAULER AND THIS IS THE HAULER USERNAME")
              console.log(previous_page_data.username)
              navigate('Hauler',{username: previous_page_data.username, infoArray: myArray})


            }         
          })
          .catch(function(error){
            console.log(error)
            console.log("catching error message");
            console.log("cathing this error message in hauling side");
            // Alert.alert(
            //     'The username you entered is already in use'
            // )
          })
  }

  _wantToMove(username){
      const {navigate} = this.props.navigation;
      console.log("THE USERNAME IS BELOW ON LINE 459")
      console.log(username)
      /*GET REQUEST ON /jobs/ to see if this user already has a request in place*/
      api = "https://maninvanapp-188121.appspot.com/jobs/" +username
       fetch(api, {

          method: "GET",
          headers: {
            "Content-Type": "application/json"
          },
        }).then(function(response){
          console.log(response);
          console.log(response.status)
          if (response.status >= 400){
            console.log("LINE 470 we got a bad get request")

            //navigate('WaitingScreen',{mover:previous_page_data.username})
            
            // return false;
          } 
          else{
            console.log("this worked")

            // console.log(response)
            // console.log(typeof(response)) 
            // console.log(response._bodyInit)
            // console.log(typeof(response._bodyInit))
            // var k = response._bodyInit.replace(/\\/g, ""); 
            // console.log(k)

            var myResponseBody = response._bodyInit.replace(/\\/g, "");
            console.log("MY RESPONSE BODY BELOW")
            console.log(myResponseBody)
            if (myResponseBody.length < 7){

              console.log("YOUVE NEVER REQUESTED A JOB BEFORE line 492")
              navigate('User', {username: previous_page_data.username})
            }
            else{

              myArray = []
              splitResponse = myResponseBody.split('"_id"');
              for (i = 1; i<splitResponse.length; i++){
                console.log(i)
                thisObject = '{"key": ' + i + ', "_id"' + splitResponse[i];//k.split("_id")[i]
                thisObject = thisObject.substring(0, thisObject.length-3)
                console.log("THIS OBJECT BELOW")
                console.log(thisObject);
                thisObjectJson = JSON.parse(thisObject)
                console.log(thisObjectJson);
                myArray.push(thisObjectJson)
                }
                var hauler = thisObjectJson.hauler;
                if (hauler == null){
                  navigate('Waiting',{mover:previous_page_data.username})
                  console.log("YOU ALREADY HAVE A JOB REQUEST")
                  Alert.alert(
                    'It seems that you already have a job that has not been accepted yet!'
                  )  
                }
                else{
                  console.log("YOUVE HAD A JOB BEFORE BUT ITS BEEN SERVICED")

                     api = "https://maninvanapp-188121.appspot.com/user/" + hauler
                                fetch(api, {
                                method: "GET",
                                headers: {
                                  "Content-Type": "application/json"
                                },
                              }).then(function(response){
                                console.log(response);
                                console.log(response.status)
                                if (response.status >= 400){
                                  console.log("there was an error")
                                  Alert.alert(
                                    'We are experiencing technical difficulties. Please try again'
                                  ) 
                                  // return false;
                                } 
                                else{
                                  console.log("this worked")

                                  console.log(response);



                                  var myResponseBody = response._bodyInit.replace(/\\/g, "");
                                  myArray = []
                                  splitResponse = myResponseBody.split('"_id"');
                                  for (i = 1; i<splitResponse.length; i++){
                                    console.log(i)
                                    thisObject = '{"key": ' + i + ', "_id"' + splitResponse[i];//k.split("_id")[i]
                                    thisObject = thisObject.substring(0, thisObject.length-3)
                                    console.log("THIS OBJECT BELOW")
                                    console.log(thisObject);
                                    thisObjectJson = JSON.parse(thisObject)
                                    thisObjectJson["toPrint"] = "Max Price: " +thisObjectJson.max_price + " --- Finish By: " + thisObjectJson.finish_by;
                                    console.log(thisObjectJson);
                                    myArray.push(thisObjectJson)
                                  }
                                  var hauler_phone_number = thisObjectJson.phone_number;
                                  var hauler_first_name = thisObjectJson.first_name;
                                  navigate("UserMatch",{"phone_number":hauler_phone_number, "first_name": hauler_first_name, "username": username})


                              

                                       //this.state.username
                                      // return true;
                                    }         
                                  })
                                  .catch(function(error){
                                    console.log(error)
                                    console.log("catching error message");
                                    // Alert.alert(
                                    //     'The username you entered is already in use'
                                    // )
                                  })

                }


            }



              
            //}
            
          }       
        })
        .catch(function(error){
          console.log(error)
          console.log("line 334 user had a job request already");
          // Alert.alert(
          //     'The username you entered is already in use'
          // )
        })


        

  }





   render(){
    const {navigate} = this.props.navigation;
    previous_page_data = this.props.navigation.state.params
    return(

      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center'}}>
 
    <Text style = {styles.titleText}>Mover or Hauler?</Text>
      <Button style = {{justifyContent: 'center', alignItems: 'center'}} onPress ={() => this._wantToMove(previous_page_data.username)} title = 'I want to Move'/>
      <Button style = {{justifyContent: 'center', alignItems: 'center'}}  onPress ={() => this._getMoverInfo(previous_page_data.username)} title = 'I want to Haul'/>
      
      <View style = {{flex: 1,position: 'absolute', bottom:0, left:0,}}>
          <Button  onPress ={() => this._logoutButtonPressed()} title = 'Logout'/>
        </View>

      </View>


    )
 }


}


class UserScreen extends React.Component {
  constructor (props) {
      super(props);
      this.state = {
        rooms_to_move: 0,
        start_time: "00:00",
        finish_by: "00:00",
        max_price: 0,
        description: "",
        // isDateTimePickerVisible: false,
        isSetTimeClicked: false,
        isFinishTimeClicked: false
      }
      this._startTimePressed = this._startTimePressed.bind(this);
      this._handleDatePicked = this._handleDatePicked.bind(this);
      this._finishTimePressed = this._finishTimePressed.bind(this);
      this._submitButtonPressed = this._submitButtonPressed.bind(this);
      this._hideDateTimePicker = this._hideDateTimePicker.bind(this);
  } 



  _startTimePressed(){
    // this.setState({isDateTimePickerVisible: true})
    this.setState({isSetTimeClicked:true})
  }
  _finishTimePressed(){
     // this.setState({isDateTimePickerVisible: true})
    this.setState({isFinishTimeClicked:true})
  }

    // _hideDateTimePicker = () => this.setState({ isDateTimePickerVisible: false });


  _hideDateTimePicker = () => {
    this.setState({isSetTimeClicked:false});
    this.setState({isFinishTimeClicked:false});

  }


 
  _handleDatePicked = (date) => {
    this._hideDateTimePicker();
    var dateTimeArray = new Date(date).toLocaleString().split(" "); 
    var timeArray = dateTimeArray[1].split(":"); 
    var time = timeArray[0]+":"+timeArray[1]
    var amPm = dateTimeArray[2];
    displayTime = time + " " + amPm;
    if (this.state.isSetTimeClicked == true){
      this.state.start_time = displayTime; 
      this.setState({isSetTimeClicked:false})
    }
    else if (this.state.isFinishTimeClicked == true){
      this.state.finish_by = displayTime;
      this.setState({isFinishTimeClicked:false});
    }

  };

//return true iff the finish time comes AFTER the start time
  //o.w. (if finish time comes before or at start time), return false
_timeComparator(startTime, finishTime){
    startTimeArray = startTime.split(' ');
    finishTimeArray = finishTime.split(' ');
    
    startAmPm = startTimeArray[1];
    finishAmPm = finishTimeArray[1];
    console.log(finishAmPm)
    console.log(startAmPm)
    if (finishAmPm != startAmPm){
      if (finishAmPm == "AM" && startAmPm == "PM"){
        return false;
      }
      else if (finishAmPm == "PM" && startAmPm == "AM"){
        console.log("were in here");
        return true;
      }
    }
    //they are both AM or both PM 
    finishHour = parseInt(finishTimeArray[0].split(':')[0])
    finishMinutes = parseInt(finishTimeArray[0].split(':')[1])
    startHour = parseInt(startTimeArray[0].split(':')[0])
    startMinutes = parseInt(startTimeArray[0].split(':')[1])
    if (finishHour == 12 && startHour < 12){
      return false
    }
    if (startHour < finishHour){
      return true;
    }
    else if (startHour > finishHour){
      return false;
    }
    else{ //startHour == finishHour
      if (startMinutes > finishMinutes){
        return false;
      }
      else{
        return true;
      }
    }
}



  //compares start Time to finish Time
  //AND checks that both start time and finish time are after the current time
  _startAfterFinish(startTime, finishTime){
    var d = new Date();
    currentHour = d.getHours() <= 12 ? d.getHours() : d.getHours()-12;
    currentHour = currentHour == 0 ? 12: currentHour;
    amOrPm = d.getHours() <12 ? "AM" : "PM"
    currentTime = currentHour + ":" + d.getMinutes() + " " + amOrPm
    console.log(currentTime);
    return this._timeComparator(startTime, finishTime) && this._timeComparator(currentTime, startTime) && this._timeComparator(currentTime, finishTime)
  }






  _submitButtonPressed(){
    var d = new Date(); // for now
    d.getHours(); // => 9
    d.getMinutes(); // =>  30
    d.getSeconds(); // => 51
    //we can use this if we want to ensure that the user inputs time for the future as opposed to for today.

    Keyboard.dismiss();
    console.log(this.state.start_time);
    if (this.state.start_time == "00:00" && this.state.finish_by == "00:00"){
      Alert.alert(
         'You need to choose a start and finish time'
      )
    }
    else if (this.state.start_time == "00:00"){
      Alert.alert(
         'You need to choose a start time'
      )
    }
    else if (this.state.finish_by == "00:00"){
      Alert.alert(
         'You need to choose a finish time'
      )
    }
    else if(!this._startAfterFinish(this.state.start_time, this.state.finish_by)){
      Alert.alert(
         //'Silly goose, time travel only happens in sci fi movies!'
         'Woah there guy, time travel only exists in movies'
      )
    }
    else if(this.state.rooms_to_move <1){
      Alert.alert(
         //'Silly goose, time travel only happens in sci fi movies!'
         'We need some rooms to move'
      )
    }
    else if (this.state.max_price<=0){
      Alert.alert(
         //'Silly goose, time travel only happens in sci fi movies!'
         'Give us your budget'
      )
    }
    else if (this.state.description == ""){
        Alert.alert(
         //'Silly goose, time travel only happens in sci fi movies!'
         'Tell us about the job in the description box'
      )
    }
    else{ //move forward
      const {navigate} = this.props.navigation;
      previous_page_data = this.props.navigation.state.params
      console.log("WE ARE ON THE USER UI PAGE ABOUT TO MOVE TO USER ADDRESS PAGE. BELOW IS THE INFO WE ARE PASSING")
      console.log(previous_page_data)
      navigate('UserAddress',{username: previous_page_data.username, rooms_to_move: this.state.rooms_to_move, start_time: this.state.start_time, finish_by: this.state.finish_by, max_price: this.state.max_price, description: this.state.description});


    }
  }


  _logoutButtonPressed(){
    /*PLACEHOLDER PLACEHOLDER PLACEHOLDER PLACEHOLDER*/
    const {navigate} = this.props.navigation;
    //navigate('Login')
    const resetAction = NavigationActions.reset({
      index: 1,
      actions: [
          NavigationActions.navigate({ routeName: 'Welcome'}),
          NavigationActions.navigate({ routeName: 'Login'})
        ]
      })
    this.props.navigation.dispatch(resetAction)



  }
  
  render(){
    return(
        <TouchableWithoutFeedback  onPress = {Keyboard.dismiss}>

          <View style = {styles.container} >
          <View style={styles.inputsContainer}>
              <TouchableHighlight style={styles.fullWidthButton} onPress={this._submitButtonPressed}>
                  <Text style={styles.fullWidthButtonText}>Next</Text>
              </TouchableHighlight>
          </View>

          
          <DateTimePicker mode = 'time'
            isVisible={this.state.isFinishTimeClicked}
            onConfirm={this._handleDatePicked}
            onCancel={this._hideDateTimePicker}
            titleIOS ="Choose Finish Time"/> 

            <DateTimePicker mode = 'time'
            isVisible={this.state.isSetTimeClicked}
            onConfirm={this._handleDatePicked}
            onCancel={this._hideDateTimePicker}
            titleIOS = "Choose Start Time"/>
            
   

            <View style={styles.jobStartTime} >
              <Text>Number of Rooms To Move:</Text>
              <Text style = {{ marginTop: 10}}>Job Start Time:</Text>
              <Text style = {{marginTop: 10}}>Finish By:</Text>
              <Text style = {{marginTop: 50}}>Max Price:</Text>
              <TextInput style = {styles.dataEntry} placeholder="0" keyboardType = 'numeric' onChangeText={(rooms_to_move) => {this.setState({rooms_to_move})}}/>
              <TouchableOpacity style = {styles.dataEntry2} onPress={this._startTimePressed}><Text>{this.state.start_time}</Text></TouchableOpacity>
              <TouchableOpacity style = {styles.dataEntry3} onPress={this._finishTimePressed}><Text>{this.state.finish_by}</Text></TouchableOpacity>

              <TextInput style = {styles.maxPriceEntry} placeholder="$     " keyboardType = 'numeric' onChangeText={(max_price) => {this.setState({max_price})}}/>
              
              <Text style = {{marginTop: 50}}>Describe your Job:</Text>
              <Text style = {{marginTop:5, color:'rgb(218, 194, 194)'}}>e.g. movin on up</Text>
              <TextInput style = {styles.descriptionEntry} placeholder="________________________________________________"  onChangeText={(description)=> {this.setState({description})}}/>
            </View>
            <View style = {{flex: 1,position: 'absolute', bottom:0, left:0,}}>
                    <Button style = {styles.logoutButton} onPress ={() => this._logoutButtonPressed()} title = 'Logout'/>

            </View>
          </View>
        </TouchableWithoutFeedback>   

      );
  }
}

class UserAddressScreen extends React.Component{
  constructor (props) {
      super(props);
      this.state = {
        street_address: "",
        city: "",
        state_address: "",
        zip_code: 0
      }
      this._submitUserRequest = this._submitUserRequest.bind(this);
  } 

  _submitUserRequest(){

    const {navigate} = this.props.navigation;
    previous_page_data = this.props.navigation.state.params
    var mover_username = previous_page_data.username
    console.log(previous_page_data)
    console.log(this.state.state_address)
    var address = this.state.street_address+ ", " +this.state.city+ ", "+ this.state.state_address+" "+this.state.zip_code
    console.log(address)
    //navigate('Waiting')

    console.log("Were Waiting")
     
    if (this.state.street_address == ""){
        Alert.alert(
         'Tell us your street address'
      )
    }
    else if (this.state.city == ""){
        Alert.alert(
         'Tell us your city'
      )
    }
    else if (this.state.state_address == ""){
        Alert.alert(
         'Tell us your state'
      )
    }
    else if (this.state.zip_code==0){
        Alert.alert(
         'Please enter a zip code'
      )
    }
    else if (this.state.zip_code<10000 || this.state.zip_code > 99999){
        Alert.alert(
         'Please enter a valid zip code'
      )
    }

    else{

        myBody = {
              "start_time": previous_page_data.start_time,
              "finish_by": previous_page_data.finish_by,
              "max_price": previous_page_data.max_price,
              "rooms_to_move": previous_page_data.rooms_to_move,
              "address" : address,
              "mover" : previous_page_data.username,
              "hauler" : null,
              "description": previous_page_data.description,
            }
          console.log("WE ARE ON THE USER ADDRESS PAGE. ABOUT TO HIT SUBMIT REQUEST. BELOW IS THE MESSAGE BODY")
          console.log(myBody)

      //PLACEHOLDER PLACEHOLDER PLACEHOLDER PLACEHOLDER
      fetch("https://maninvanapp-188121.appspot.com/jobs", {
            method: "POST",
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify(myBody
            // {
            //   "start_time": previous_page_data.start_time,
            //   "finish_by": previous_page_data.finish_by,
            //   "max_price": previous_page_data.max_price,
            //   "rooms_to_move": previous_page_data.rooms_to_move,
            //   "address" : address,
            //   "mover" : previous_page_data.username,
            //   "hauler" : null,
            //   "description": previous_page_data.description,
            // }
            )
          }).then(function(response){
            console.log("THIS IS THE RESPONSE ON LINE 776 FROM THE POST ON JOBS")
            console.log(response);
            console.log(response.status)
            if (response.status >= 400){
              console.log("there was an error")
              Alert.alert(
                'Error: It seems that you already have a job in the queue!'
              ) 
              // return false;
            } 
            else{
              console.log("this worked. line 760")
              //this.state.username
              console.log("below is the mover username")
              console.log(mover_username)
              navigate('Waiting', {"mover": mover_username}) //'WaitingScreen'??

              // return true;
            }         
          })
          .catch(function(error){
            console.log(error)
            console.log("catching error message");
            // Alert.alert(
            //     'The username you entered is already in use'
            // )
          })

      }
  }


  render(){
    let index = 0;
    const data = [
            { key: index++, label: 'Alabama' }, //section: true,
            { key: index++, label: 'Alaska' },
            { key: index++, label: 'Arizona' },
            { key: index++, label: 'Arkansas' },
            { key: index++, label: 'California' },
            { key: index++, label: 'Colorado' },
            { key: index++, label: 'Connecticut' },
            { key: index++, label: 'Delaware' },
            { key: index++, label: 'Florida' },
            { key: index++, label: 'Georgia' },
            { key: index++, label: 'Hawaii' },
            { key: index++, label: 'Idaho' },
            { key: index++, label: 'Illinois' },
            { key: index++, label: 'Indiana' },
            { key: index++, label: 'Iowa' },
            { key: index++, label: 'Kansas' },
            { key: index++, label: 'Kentucky' },
            { key: index++, label: 'Louisiana' },
            { key: index++, label: 'Maine' },
            { key: index++, label: 'Maryland' },
            { key: index++, label: 'Massachusetts' },
            { key: index++, label: 'Michigan' },
            { key: index++, label: 'Minnesota' },
            { key: index++, label: 'Mississippi' },
            { key: index++, label: 'Missouri' },
            { key: index++, label: 'Montana' },
            { key: index++, label: 'Nebraska' },
            { key: index++, label: 'Nevada' },
            { key: index++, label: 'New Hampshire' },
            { key: index++, label: 'New Jersey' },
            { key: index++, label: 'New Mexico' },
            { key: index++, label: 'New York' },
            { key: index++, label: 'North Carolina' },
            { key: index++, label: 'Ohio' },
            { key: index++, label: 'Oklahoma' },
            { key: index++, label: 'Oregon' },
            { key: index++, label: 'Pennsylvania' },
            { key: index++, label: 'Rhode Island' },
            { key: index++, label: 'South Carolina' },
            { key: index++, label: 'South Dakota' },
            { key: index++, label: 'Tennessee' },
            { key: index++, label: 'Texas' },
            { key: index++, label: 'Utah' },
            { key: index++, label: 'Vermont' },
            { key: index++, label: 'Virginia' },
            { key: index++, label: 'Washington' },
            { key: index++, label: 'West Virginia' },
            { key: index++, label: 'Wisconsin' },
            { key: index++, label: 'Wyoming' },

            // etc...
            // Can also add additional custom keys which are passed to the onChange callback
            // { key: index++, label: 'California', customKey: 'Not a fruit' }
        ];
    return(
      
      
      <TouchableWithoutFeedback  onPress = {Keyboard.dismiss}>
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center'}}>

        <Text style = {styles.titleText}>Please Enter Your Address</Text>
        <TextInput style = {{height: 50, width: full_width, textAlign: 'center'}} 
          placeholder="Street Address" autoCapitalize = "words" onChangeText={(street_address) => {this.setState({street_address})}}/>
        <TextInput style = {{height: 50, width: full_width, textAlign: 'center'}} 
        placeholder="City" autoCapitalize = "words" onChangeText={(city) => {this.setState({city})}}/>
          <ModalSelector 
                    data={data}
                    initValue="Select State"
                    onChange={(option)=>{ this.setState({state_address:option.label})}} />

        <TextInput style = {{height: 50, width: full_width, textAlign: 'center', marginBottom: 80}} maxLength={5} 
          placeholder="Zip Code" keyboardType = 'numeric' onChangeText={(zip_code) => {this.setState({zip_code})}}/>
        

              <TouchableHighlight style={styles.fullWidthButtonSubmit} onPress ={() => this._submitUserRequest()} >
                  <Text style={styles.fullWidthButtonText}>Submit Request</Text>
              </TouchableHighlight>

      </View>
      </TouchableWithoutFeedback> 
    )
 }

}

class WaitingScreen extends React.Component{
  constructor (props) {
      super(props);
      this.state = {
        isLoading: true
      }
      // this._submitUserRequest = this._submitUserRequest.bind(this);
      //this._waitForHauler = this._waitForHauler.bind(this);
  } 



  componentWillMount(){
    console.log("component will mount")
    this.setState({isLoading: true});
    
  }
  
  componentDidlMount(){
    console.log("component did mount")
    counter = 0;
    
    this.setState({isLoading: false});
    
  }

  _getHauler(){
    console.log("hit")
    console.log("were in _get hauler now")
    const {navigate} = this.props.navigation;
    previous_page_data = this.props.navigation.state.params
    console.log(previous_page_data)
    console.log("WE ARE IN _GET HAULER. previous page data is above")
    var api = "https://maninvanapp-188121.appspot.com/jobs/" + previous_page_data.mover;
    fetch(api, {
            method: "GET",
            headers: {
              "Content-Type": "application/json"
            },
          }).then(function(response){
            console.log(response);
            console.log(response.status)

            if (response.status >= 400){
              console.log("there was an error")
              Alert.alert(
                'We are experiencing technical difficulties. Please try again'
              ) 
              // return false;
            } 
            else{
              console.log("this worked, the get on /jobs/ ednpoint")

              console.log(response);





            var myResponseBody = response._bodyInit.replace(/\\/g, "");
            console.log("MY RESPONSE BODY BELOW")
            console.log(myResponseBody)
            if (myResponseBody.length < 7){

              console.log("YOUVE NEVER REQUESTED A JOB BEFORE 1150")
              Alert.alert(
                'Technical difficulties'
              ) 

            }
            else{
              //we should get here every time since the user has requested a job before
              myArray = []
              splitResponse = myResponseBody.split('"_id"');
              for (i = 1; i<splitResponse.length; i++){
                console.log(i)
                thisObject = '{"key": ' + i + ', "_id"' + splitResponse[i];//k.split("_id")[i]
                thisObject = thisObject.substring(0, thisObject.length-3)
                console.log("THIS OBJECT BELOW")
                console.log(thisObject);
                thisObjectJson = JSON.parse(thisObject)
                console.log(thisObjectJson);
                myArray.push(thisObjectJson)
                }
                var hauler = thisObjectJson.hauler;
                if (hauler == null){
                  Alert.alert(
                    'Your job has not yet been picked up. Please check again soon.'
                  ) 
                }
               else{
                console.log(myResponseBody.length)
                console.log("hit the else on checking the response body ")




                                api = "https://maninvanapp-188121.appspot.com/user/" + hauler
                                fetch(api, {
                                method: "GET",
                                headers: {
                                  "Content-Type": "application/json"
                                },
                              }).then(function(response){
                                console.log(response);
                                console.log(response.status)
                                if (response.status >= 400){
                                  console.log("there was an error")
                                  Alert.alert(
                                    'We are experiencing technical difficulties. Please try again'
                                  ) 
                                  // return false;
                                } 
                                else{
                                  console.log("this worked")

                                  console.log(response);



                                  var myResponseBody = response._bodyInit.replace(/\\/g, "");
                                  myArray = []
                                  splitResponse = myResponseBody.split('"_id"');
                                  for (i = 1; i<splitResponse.length; i++){
                                    console.log(i)
                                    thisObject = '{"key": ' + i + ', "_id"' + splitResponse[i];//k.split("_id")[i]
                                    thisObject = thisObject.substring(0, thisObject.length-3)
                                    console.log("THIS OBJECT BELOW")
                                    console.log(thisObject);
                                    thisObjectJson = JSON.parse(thisObject)
                                    thisObjectJson["toPrint"] = "Max Price: " +thisObjectJson.max_price + " --- Finish By: " + thisObjectJson.finish_by;
                                    console.log(thisObjectJson);
                                    myArray.push(thisObjectJson)
                                  }
                                  var hauler_phone_number = thisObjectJson.phone_number;
                                  var hauler_first_name = thisObjectJson.first_name;
                                  navigate("UserMatch",{"phone_number":hauler_phone_number, "first_name": hauler_first_name, "username":previous_page_data.mover})


                              

                                       //this.state.username
                                      // return true;
                                    }         
                                  })
                                  .catch(function(error){
                                    console.log(error)
                                    console.log("catching error message");
                                    // Alert.alert(
                                    //     'The username you entered is already in use'
                                    // )
                                  })

                    }
}


            }         
          })
          .catch(function(error){
            console.log(error)
            console.log("catching error message");
            // Alert.alert(
            //     'The username you entered is already in use'
            // )
          })


  }

  

  render(){ 
    // if (this.state.isLoading == true) {
    
    return(
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center'}}>
        <Text style = {styles.titleText}>Just a moment</Text>
        <Text style = {styles.sexyText}>We are finding the perfect match</Text> 
      
       

      <Button style = {{justifyContent: 'center', alignItems: 'center', color:'black'}} onPress ={() => this._getHauler() } title = 'Reveal Your Hauler'/>


      </View>

    )



    // <View style={{ flex: 1 }}>
    //     <Spinner visible={true} textContent={"Testing 2..."} textStyle={{color: '#FFF'}} />
    //   </View>

    //}
    // return(
    //   <View>
    //   <Text style = {styles.titleText}>Welcome to Man In The Van</Text>
    //   <Text style = {styles.sexyText}>Sexiest App in the World</Text> 
    //   </View>
    //   )

 }

}

class UserMatchScreen extends React.Component{


  constructor (props) {
      super(props);
      this.state = {
      }
      this._textMessage = this._textMessage.bind(this);
      this._makePhoneCall = this._makePhoneCall.bind(this);
  } 


  _textMessage(phoneNumber, name){
    var body = "Hey! Thanks for accepting my hauling request," + " "+name+"!"
    text(phoneNumber, body)

  }

  _makePhoneCall(phoneNumber){
    // phoneNumber = "" +phoneNumber
    phoneNumber2 = String(phoneNumber)
    var prompt = true
    phonecall(phoneNumber2, prompt)
  }

  render(){
    const resizeMode = 'center';
    const {navigate} = this.props.navigation;
    const previous_page_data = this.props.navigation.state.params
    const phoneNumber = previous_page_data.phone_number
    const first_name = previous_page_data.first_name
    const user_name = previous_page_data.username
    // const last_name = previous_page_data.last_name
    // const address = previous_page_data.address
    const message = first_name + " accepted your job!"
    return(
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center'}}>
  
    <Text style = {styles.titleText}>{message}</Text>
    <Button style = {{justifyContent: 'center', alignItems: 'center', color:'black'}} onPress ={() => this._textMessage(phoneNumber, first_name) } title = 'Send them a Text'/>
    <Button style = {{justifyContent: 'center', alignItems: 'center', color:'black'}} onPress ={() => this._makePhoneCall(phoneNumber) } title = 'Make a Phone Call'/>

    <Button style = {{justifyContent: 'center', alignItems: 'center', color:'black'}} onPress ={() => navigate('User', {username:  user_name})} title = 'Make Another Request'/>


    </View>


  )
 }
}



/*
  constructor (props) {
      super(props);
      this.state = {
        phone_number: "15162342345",
        hauler_username: 'steve',
        hauler_image: null, 

      }
      this._textMessage = this._textMessage.bind(this);
      this._makePhoneCall = this._makePhoneCall.bind(this);
  } 


  componentWillMount(){

    if (this.state.hauler_username == 'steve'){
      this.setState({hauler_image:require('./steve.jpg')})
    }
    


    // if (this.state.hauler_username == 'steve'){
    //   // (./steve.jpg) => {this.setState({hauler_image})}
    //   this.setState({hauler_image:'./steve.jpg'})
  }

  // componentDidMount(){
    
  //   }

  // }

  _textMessage(){
    var phoneNumber = this.state.phone_number
    var body = "Hey! Thanks for accepting my hauling request, daddy!"
    text(phoneNumber, body)

  }

  _makePhoneCall(){
    var phoneNumber = this.state.phone_number
    var prompt = true
    phonecall(phoneNumber, prompt)
  }

  render(){
    const resizeMode = 'center';
    const {navigate} = this.props.navigation;
    const steve = './steve.jpg';
    return(
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center'}}>
  
        <Image style={{flex: 1,resizeMode , marginTop:80}}  source={this.state.hauler_image} /> 

    <Text style = {styles.titleText}>We found a match!</Text>
    <Button style = {{justifyContent: 'center', alignItems: 'center', color:'black'}} onPress ={() => this._textMessage() } title = 'Send a Text'/>
    <Button style = {{justifyContent: 'center', alignItems: 'center', color:'black'}} onPress ={() => this._makePhoneCall() } title = 'Make a Phone Call'/>

      
    </View>


  )
 }

}
*/


class HaulerScreen extends React.Component{
  
  _goToNextPage(moverInfo){
    console.log("Want to go to next page")
    console.log(moverInfo)
    const {navigate} = this.props.navigation;
    previous_page_data = this.props.navigation.state.params;

    navigate('UserInfoForHauler',{"address":moverInfo.address, 
      "description":moverInfo.description,"finish_by":moverInfo.finish_by,"max_price":moverInfo.max_price,
      "mover":moverInfo.mover,"rooms_to_move":moverInfo.rooms_to_move,"start_time":moverInfo.start_time, "hauler_username": previous_page_data.username})

  }


  _logoutButtonPressed(){
    /*PLACEHOLDER PLACEHOLDER PLACEHOLDER PLACEHOLDER*/
    const {navigate} = this.props.navigation;
    //navigate('Login')
    const resetAction = NavigationActions.reset({
      index: 1,
      actions: [
          NavigationActions.navigate({ routeName: 'Welcome'}),
          NavigationActions.navigate({ routeName: 'Login'})
        ]
      })
    this.props.navigation.dispatch(resetAction)

  }

  WholeNews() {
    previous_page_data = this.props.navigation.state.params
  var myArray = previous_page_data.infoArray
  console.log("WHOLE NEWS BELOW")
  console.log(myArray)
 var i = -1;
  return myArray.map((news, i) =>{
    return(
      
      <View key={i} style={{marginTop:10}} >

        <Button title = {news.toPrint}  onPress ={() => this._goToNextPage(news) }  />
      </View>
    );
  });
}


    alertItemName = (item) => {
      alert(item.name)
   }
   render() {
      //const thisArray = this.state.myStateArray;
      previous_page_data = this.props.navigation.state.params
      const myArray = previous_page_data.infoArray
      return (
         <View>
             

           <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center'}}> 
            <Text style = {styles.titleText}>Choose a Job For Details</Text>
            </View>
          <View style ={{position: 'absolute', top:50, justifyContent: 'center', alignItems:'center', width: '100%'}}>
                {this.WholeNews()}
          </View> 

          
         </View>
      )
   }

}



class HaulerMatchScreen extends React.Component{

  constructor (props) {
      super(props);
      this.state = {
      }
      this._textMessage = this._textMessage.bind(this);
      this._makePhoneCall = this._makePhoneCall.bind(this);
  } 


  _textMessage(phoneNumber, name){
    console.log(phoneNumber)
    console.log(typeof(phoneNumber))
    console.log(name)
    console.log("we made it here")
    console.log(typeof(phoneNumber))
    var body = "Hey! I am excited to move your stuff," + " "+name+"!"
    console.log(phoneNumber)
    text(phoneNumber, body)

  }

  _makePhoneCall(phoneNumber){
    // phoneNumber = "" +phoneNumber
    phoneNumber2 = String(phoneNumber)

    console.log("we made it here")
    console.log(typeof(phoneNumber2))
    var prompt = true
    console.log(phoneNumber2)
    phonecall(phoneNumber2, prompt)
  }

  render(){
    const resizeMode = 'center';
    const {navigate} = this.props.navigation;
    const previous_page_data = this.props.navigation.state.params
    const phoneNumber = previous_page_data.phone_number
    const first_name = previous_page_data.first_name
    const last_name = previous_page_data.last_name
    const address = previous_page_data.address

    return(
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center'}}>
  
    <Text style = {styles.titleText}>Thanks for taking the job!</Text>
    <Button style = {{justifyContent: 'center', alignItems: 'center', color:'black'}} onPress ={() => this._textMessage(phoneNumber, first_name) } title = 'Send a Text'/>
    <Button style = {{justifyContent: 'center', alignItems: 'center', color:'black'}} onPress ={() => this._makePhoneCall(phoneNumber) } title = 'Make a Phone Call'/>

      
    </View>


  )
 }

}


class UserInfoForHaulerScreen extends React.Component{



  // _sendPut(){
  //   const {navigate} = this.props.navigation;
  //   prevInfo = this.props.navigation.state.params
  //   fetch("https://maninvanapp-188121.appspot.com/jobs", {
  //           method: "PUT",
  //           headers: {
  //             "Content-Type": "application/json"
  //           },
  //           body: JSON.stringify({
  //             "mover": prevInfo.mover,
  //             "hauler": prevInfo.hauler_username,
              
  //           })
  //         }).then(function(response){
  //           console.log(response);
  //           console.log(response.status)
  //           if (response.status >= 400){
  //             console.log("there was an error")
  //             Alert.alert(
  //               'We are experiencing technical difficulties. Please try again'
  //             ) 
  //             // return false;
  //           } 
  //           else{
  //             console.log("this worked")
  //             //this.state.username
  //             // return true;
  //           }         
  //         })
  //         .catch(function(error){
  //           console.log(error)
  //           console.log("catching error message");
  //           // Alert.alert(
  //           //     'The username you entered is already in use'
  //           // )
  //         })
  // }




  // _moveForward(moreMoverInfo){
  //   const {navigate} = this.props.navigation;
  //   prevMoverInfo = this.props.navigation.state.params
  //   console.log("MORE MOVER INFO")
  //   console.log(moreMoverInfo)
  //   navigate('HaulerMatch',{"first_name":moreMoverInfo.first_name,"last_name":moreMoverInfo.last_name,'phone_number':moreMoverInfo.phone_number,
  //             "Address":prevMoverInfo.address})

  // }

  _getMoreMoverInfo(){
    const {navigate} = this.props.navigation;
    prevInfo = this.props.navigation.state.params
    

    fetch("https://maninvanapp-188121.appspot.com/jobs", {
            method: "PUT",
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify({
              "mover": prevInfo.mover,
              "hauler": prevInfo.hauler_username,
              
            })
          }).then(function(response){
            console.log(response);
            console.log(response.status)
            if (response.status >= 400){
              console.log("there was an error")
              Alert.alert(
                'We are experiencing technical difficulties. Please try again'
              ) 
              // return false;
            } 
            else{
              console.log("this worked")
              //this.state.username
              // return true;
            }         
          })
          .catch(function(error){
            console.log(error)
            console.log("catching error message");
            // Alert.alert(
            //     'The username you entered is already in use'
            // )
          })


    moverInfo = this.props.navigation.state.params
    var api = "https://maninvanapp-188121.appspot.com/user/" + moverInfo.mover
    fetch(api, {
            method: "GET",
            headers: {
              "Content-Type": "application/json"
            },
          }).then(function(response){
            console.log(response);
            console.log(response.status)
            if (response.status >= 400){
              console.log("there was an error in the get")
              Alert.alert(
                'We are experiencing technical difficulties. Please try again'
              ) 
            } 
            else{
              console.log("this worked")
              console.log(response);



              var myResponseBody = response._bodyInit.replace(/\\/g, "");
              myArray = []
              splitResponse = myResponseBody.split('"_id"');
              for (i = 1; i<splitResponse.length; i++){
                console.log(i)
                thisObject = '{"key": ' + i + ', "_id"' + splitResponse[i];//k.split("_id")[i]
                thisObject = thisObject.substring(0, thisObject.length-3)
                console.log("THIS OBJECT BELOW")
                console.log(thisObject);
                thisObjectJson = JSON.parse(thisObject)
                thisObjectJson["toPrint"] = "Max Price: " +thisObjectJson.max_price + " --- Finish By: " + thisObjectJson.finish_by;
                console.log(thisObjectJson);
                myArray.push(thisObjectJson)
              }







              var first_name = thisObjectJson.first_name;
              var last_name = thisObjectJson.last_name;
              var phone_number = thisObjectJson.phone_number;
              myObject = {'first_name':first_name, 'last_name': last_name, "phone_number": phone_number };
              //this._moveForward(myObject)
              moreMoverInfo = myObject
              // prevMoverInfo = this.props.navigation.state.params
              console.log("MORE MOVER INFO")
              console.log(moreMoverInfo)
              navigate('HaulerMatch',{"first_name":moreMoverInfo.first_name,"last_name":moreMoverInfo.last_name,'phone_number':moreMoverInfo.phone_number,
              "Address":moverInfo.address})

              
            }         
          })
          .catch(function(error){
            console.log(error)
            console.log("catching error message");
          })
  }

  // _jobAcceptButtonHit(){
  //   console.log("accept button hit")

  //   this._sendPut()
  //   this._getMoreMoverInfo()
    
    
  // }

   render(){
    const {navigate} = this.props.navigation;
    moverInfo = this.props.navigation.state.params

    return(
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center'}}>
  
    <Text style = {styles.titleText}>The Job Info</Text>
    
        <Text style ={styles.infoText}> Username: {moverInfo.mover}</Text>
        <Text style ={styles.infoText}> Address: {moverInfo.address}</Text>
        <Text style ={styles.infoText}> Max Price: {moverInfo.max_price}</Text>
        <Text style ={styles.infoText}> Rooms to Move: {moverInfo.rooms_to_move}</Text>
        <Text style ={styles.infoText}> Start Time: {moverInfo.start_time}</Text>
        <Text style ={styles.infoText}> Finish Time: {moverInfo.finish_by}</Text>
        <Text style ={styles.infoText}> Description: {moverInfo.description}</Text>
        <TouchableHighlight style={styles.fullWidthButtonSubmit} onPress ={() => this._getMoreMoverInfo()} >
                  <Text style={styles.fullWidthButtonText}>Accept Job</Text>
          </TouchableHighlight>
    </View>

    )
 }





}




const RootNavigator = StackNavigator({

  Welcome: {
    screen: WelcomeScreen,
    navigationOptions: {
      headerTitle: 'Welcome',
    },
  },
  SignUp:{
    screen: SignUpScreen,
    navigationOptions: {
      headerTitle: 'Sign Up',
    },
  },
  WelcomeNewUser:{
    screen: WelcomeNewUserScreen,
    navigationOptions: {
      headerTitle: '', 
    },
  },
  Login: {
    screen: LoginScreen,
    navigationOptions: {
      headerTitle: 'Login',
    },
  },
  UserType:{
    screen: UserTypeScreen,
    navigationOptions: {
      headerTitle: 'User Type',
    },
  },
  User: {
    screen: UserScreen,
    navigationOptions: {
      headerTitle: 'Mover UI',
    },
  },
  UserAddress: {
    screen: UserAddressScreen,
    navigationOptions: {
      headerTitle: 'Address',
    },
  },
  Waiting: {
    screen: WaitingScreen,
    navigationOptions: {
      headerTitle: 'Syncing',
    },
  },
  UserMatch: {
    screen: UserMatchScreen,
    navigationOptions: {
      headerTitle: 'Match',
    },
  },
  Hauler: {
    screen: HaulerScreen,
    navigationOptions: {
      headerTitle: 'Hauler UI',
    },
  },
   UserInfoForHauler: {
    screen: UserInfoForHaulerScreen,
    navigationOptions: {
      headerTitle: 'Job Details',
    },
  },
  HaulerMatch: {
    screen: HaulerMatchScreen,
    navigationOptions: {
      headerTitle: 'Match',
    },
  },
});

export default RootNavigator;


const styles = StyleSheet.create({
 
  titleText: {
    position: 'absolute',
    top: 20,
    fontSize: 20,
    fontWeight: 'bold',
  },
  sexyText:{
    position: 'absolute',
    top: 60,
    fontSize: 15,
    fontWeight: 'bold',
  },
  username:{
    position: 'absolute',
    top:170,
    width: full_width,
    textAlign: 'center'
  },
  password:{
    position:'absolute',
    top:220,
    width: full_width,
    textAlign: 'center'
  },
  jobStartTime:{
    position: 'absolute',
    top:80,
    left:10,
  },
  dataEntry:{
    position: 'absolute',
    top: 0,
    left: 200,
    width: 200
  },
  dataEntry2:{
    position:'absolute',
    top: 28,
    left:200
  },
  dataEntry3:{
    position:'absolute', 
    top: 56,
    left:200,
  },
  maxPriceEntry:{
    position: 'absolute',
    top:121,
    left:100,
    width: 200
  },
  descriptionEntry:{
    position: 'absolute',
    top: 275,
    left:-10,
    width:500,
    marginRight: 10,
    marginLeft:10,
    fontWeight:'bold',
    color: 'rgb(3, 1, 1)'
  },
  sendButton:{
    position:'absolute',
    top:800,
    bottom:10,
    borderWidth: 20,
    
    backgroundColor: 'black'
  },
  container: {
    flex: 1,
  },
  inputsContainer: {
    flex: 1
  },
  fullWidthButton: {
    backgroundColor: 'blue',
    height:70,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  fullWidthButtonSubmit: {
    backgroundColor: 'blue',
    height:70,
    width: full_width,
    position: 'absolute',
    bottom: 0,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  fullWidthButtonText: {
    fontSize:24,
    color: 'white'
  },
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover', // or 'stretch'
  },
  logoutButton: {
    position: 'absolute',
    bottom:0,
    left:0,
  },
  infoText:{
    position: 'relative',
    top: 20,
    alignItems:'center',
    justifyContent:'center',
    marginTop: 5,
    fontSize: 18,
    fontWeight: 'bold',

  },





  container2: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#d35400',
  },

  spinner: {
    marginBottom: 50,
     flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#d35400',
  },

  btn: {
    marginTop: 20
  },

  text: {
    color: "white"
  },
  containerHauler: {
      padding: 10,
      marginTop: 3,
      backgroundColor: '#d9f9b1',
      alignItems: 'center',
   },
   textHauler: {
      color: '#4f603c'
   }


  

});




