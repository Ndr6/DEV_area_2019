import 'package:flutter/material.dart';
import 'package:mobile_client/WebService/LoginWebService.dart';

class RegisterPage extends StatefulWidget
{

  @override
  State<StatefulWidget> createState() => RegisterPageState();

}

class RegisterPageState extends State<RegisterPage>
{

  bool _isAlreadyTaken = false;
  String username;
  String password;

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: Colors.blue,
      body: Padding(
        padding: EdgeInsets.all(10),
        child: SafeArea(
          child: Column(
            mainAxisAlignment: MainAxisAlignment.center,
            children: <Widget>[

              Text("Créer un compte", style: TextStyle(fontWeight: FontWeight.bold, color: Colors.white), ),

              SizedBox(height: 10),

              TextFormField(
                  style: TextStyle(
                    color: Colors.white,
                  ),
                  decoration: InputDecoration(
                    hintText: 'Nom de compte',
                    hintStyle: TextStyle(
                        color: Colors.white
                    ),

                    border: OutlineInputBorder(
                      borderSide: BorderSide(
                          color: Colors.white
                      ),
                      borderRadius: BorderRadius.circular(10),
                    ),

                    enabledBorder: OutlineInputBorder(
                      borderSide: BorderSide(
                          color: Colors.white
                      ),
                      borderRadius: BorderRadius.circular(10),
                    ),

                    fillColor: Colors.transparent,

                    //   filled: true,
                    prefixIcon: Icon(
                      Icons.account_circle,
                      color: Colors.white,
                    ),
                  ),
                  onChanged: (value) => setState(() => username = value)
              ),

              SizedBox(height: 10),

              TextFormField(
                  style: TextStyle(
                    color: Colors.white,
                  ),
                  decoration: InputDecoration(
                    hintText: 'Mot de passe',
                    hintStyle: TextStyle(
                        color: Colors.white
                    ),

                    border: OutlineInputBorder(
                      borderSide: BorderSide(
                          color: Colors.white
                      ),
                      borderRadius: BorderRadius.circular(10),
                    ),

                    enabledBorder: OutlineInputBorder(
                      borderSide: BorderSide(
                          color: Colors.white
                      ),
                      borderRadius: BorderRadius.circular(10),
                    ),

                    fillColor: Colors.transparent,

                    //   filled: true,
                    prefixIcon: Icon(
                      Icons.lock_outline,
                      color: Colors.white,
                    ),
                  ),
                  onChanged: (value) => setState(() => password = value)
              ),

              SizedBox(height: 10),

              Row(
                children: <Widget>[
                  Expanded(
                    child: FlatButton(
                      color: Colors.redAccent,
                      textColor: Colors.white,
                      onPressed: () async {
                        await registerUser(this.username, this.password).then((response)
                        {
                          if (response.statusCode == 200)
                          {
                            print("Login " + this.username + " Password " + this.password);
                          } else {
                            print("bite " + response.body);
                            setState(() {
                              _isAlreadyTaken = true;
                            });
                          }
                        });
                      },
                      child: Text(
                        "VALIDER",
                        style: TextStyle(fontSize: 14.0),
                      ),
                    ),
                  ),
                ],
              ),
            ],
          ),
        ),
      ),
    );
  }

}