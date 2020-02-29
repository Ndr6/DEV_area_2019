import 'dart:convert';

import 'package:http/http.dart' as http;
import 'package:crypto/crypto.dart';

class TokenResponse {
  final String token;

  TokenResponse(this.token);

  factory TokenResponse.fromJson(Map<String, dynamic> json) {
    return TokenResponse(json['token']);
  }
}

Future<TokenResponse> loginUser(String login, String password) async {
  final hash = sha512.convert(utf8.encode(password));

  final response = await http.post('https://area-server-dev.herokuapp.com/auth/signin?username=$login&password=$hash');

  if (response.statusCode == 200) {
    return TokenResponse.fromJson(jsonDecode(response.body));
  }
  return null;
}