import 'dart:convert';

import 'package:http/http.dart' as http;
import 'package:crypto/crypto.dart';
import 'package:http/http.dart';

class TokenResponseModel {
  final String token;

  TokenResponseModel(this.token);

  factory TokenResponseModel.fromJson(Map<String, dynamic> json) {
    return TokenResponseModel(json['token']);
  }
}

Future<TokenResponseModel> loginUser(String login, String password) async {
  final hash = sha512.convert(utf8.encode(password));

  final response = await http.post('https://area-server-dev.herokuapp.com/auth/signin?username=$login&password=$hash');

  if (response.statusCode == 200) {
    return TokenResponseModel.fromJson(jsonDecode(response.body));
  }
  return null;
}

Future<Response> registerUser(String login, String password) async {
  final hash = sha512.convert(utf8.encode(password));

  return await http.post('https://area-server-dev.herokuapp.com/auth/signup?username=$login&password=$hash');
  ;
}