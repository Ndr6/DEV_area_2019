import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'package:flutter/widgets.dart';
import 'package:flutter_auth_buttons/flutter_auth_buttons.dart';
import 'package:google_sign_in/google_sign_in.dart';
import 'package:mobile_client/Views/HomePage.dart';
import 'package:mobile_client/WebService/AreaAPI.dart';
import 'package:mobile_client/main.dart';

class LoginPage extends StatelessWidget {
  GoogleSignIn _googleSignIn = GoogleSignIn(
    scopes: [
      'email',
      'https://www.googleapis.com/auth/contacts.readonly',
    ],
  );

  InputDecoration buildInputFieldDecoration(String hint) => InputDecoration(
        hintText: hint,
        hintStyle: TextStyle(color: Colors.white),
        border: OutlineInputBorder(
          borderSide: BorderSide(color: Colors.white),
          borderRadius: BorderRadius.circular(10),
        ),
        enabledBorder: OutlineInputBorder(
          borderSide: BorderSide(color: Colors.white),
          borderRadius: BorderRadius.circular(10),
        ),
        fillColor: Colors.transparent,
        prefixIcon: Icon(
          Icons.account_circle,
          color: Colors.white,
        ),
      );

  Widget buildForm() {
    String username, password;

    return StatefulBuilder(
      builder: (context, setState) => Form(
        child: Column(
          mainAxisSize: MainAxisSize.max,

          children: <Widget>[
            TextFormField(
              style: TextStyle(
                color: Colors.white,
              ),
              decoration: buildInputFieldDecoration('Nom de compte'),
              onSaved: (value) => setState(() => username = value),
            ),
            SizedBox(height: 15),
            TextFormField(
              style: TextStyle(
                color: Colors.white,
              ),
              obscureText: true,
              decoration: buildInputFieldDecoration('Mot de passe'),
              onSaved: (value) => setState(() => password = value),
            ),
            Row(
              mainAxisSize: MainAxisSize.max,
              mainAxisAlignment: MainAxisAlignment.center,
              children: <Widget>[
                Expanded(
                  child: FlatButton(
                    color: Colors.redAccent,
                    textColor: Colors.white,
                    onPressed: () async {
                      AreaAPI().token = (await AreaAPI().loginUser(username, password).catchError((error) => showDialog(
                        context: context,
                        builder: (context) => Text('Erreur lors de la connexion: $error')
                      ))).token;
                      Navigator.of(context).pushReplacement(MaterialPageRoute(builder: (context) => MyHomePage(title: 'AREA')));
                    },
                    child: Text(
                      "CONNEXION",
                      style: TextStyle(fontSize: 14.0),
                    ),
                  ),
                ),

              ],
            ),
            Expanded(
              child: Column(
                mainAxisAlignment: MainAxisAlignment.end,
                children: <Widget>[
                  GoogleSignInButton(
                    darkMode: true,
                    onPressed: () async {
                      try {
                        var answer = await _googleSignIn.signIn();
                        var auth = await answer.authentication;
                        print(auth.accessToken);
                      } catch (error) {
                        print(error);
                      }
                    },
                  )
                ],
              ),
            ),
          ],
        ),
      ),
    );
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Container(
        decoration: BoxDecoration(
          color: const Color(0X00000FF),
          image: DecorationImage(
            colorFilter: new ColorFilter.mode(Colors.black.withOpacity(0.5), BlendMode.dstATop),
            image: NetworkImage(
                "https://image.freepik.com/free-vector/mobile-background-with-starry-sky-purple-tones_79603-550.jpg"),
            fit: BoxFit.cover,
          ),
        ),
        child: Center(
          child: Padding(
            padding: EdgeInsets.only(top: 70),
            child: Column(
              mainAxisAlignment: MainAxisAlignment.start,
              children: <Widget>[
                Image.network(
                    "https://www.freelogodesign.org/download/file?id=585343d6-a1be-47a6-91a1-05e9370072ad_200x200.png",
                    height: 150,
                    width: 150),
                buildForm(),
                SizedBox(height: 20),
                ClipRect(
                  child: Container(
                    height: 300,
                    color: Color.fromARGB(0, 0, 0, 0),
                    child: Padding(
                      padding: EdgeInsets.all(20),
                      child: Column(
                        children: [

                        ],
                      ),
                    ),
                  ),
                ),
              ],
            ),
          ),
        ),
      ),
    );
  }
}
