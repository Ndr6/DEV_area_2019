import 'dart:convert';
import 'package:http/http.dart' as http;
import 'package:crypto/crypto.dart';
import 'package:mobile_client/Models/ServiceModel.dart';
import 'package:mobile_client/Models/TokenResponse.dart';

class AreaAPI {

  static final AreaAPI _instance = new AreaAPI._internal();

  String token;

  factory AreaAPI() {
    return _instance;
  }

  AreaAPI._internal();

  final String baseUrl = "http://10.26.112.53:36969";

  Future<TokenResponse> loginUser(String login, String password) async {
    final hash = sha512.convert(utf8.encode(password));

    final response = await http.post('$baseUrl/auth/signin?username=$login&password=$hash');

    if (response.statusCode == 200) {
      return TokenResponse.fromJson(jsonDecode(response.body));
    } else {
      throw Exception('Failed to login user');
    }
  }

  Future<TokenResponse> registerUser(String login, String password) async {
    final hash = sha512.convert(utf8.encode(password));

    final response = await http.post('$baseUrl/auth/signup?username=$login&password=$hash');

    if (response.statusCode == 200) {
      return TokenResponse.fromJson(jsonDecode(response.body));
    } else {
      throw Exception('Failed to register user ' + response.body);
    }
  }

  Future<ServiceModel> getServices(String login, String password) async {
    final hash = sha512.convert(utf8.encode(password));

    final response = await http.get('$baseUrl/list');

    if (response.statusCode == 200) {
      return ServiceModel.fromJson(jsonDecode(response.body));
    } else {
      throw Exception('Failed to register user ' + response.body);
    }
  }


}
