import 'dart:convert';
import 'dart:io';
import 'package:http/http.dart' as http;
import 'package:crypto/crypto.dart';
import 'package:http/http.dart';
import 'package:mobile_client/Models/ConnectToServiceModel.dart';
import 'package:mobile_client/Models/ConnectedServicesModel.dart';
import 'package:mobile_client/Models/ServiceModel.dart';
import 'package:mobile_client/Models/TokenResponse.dart';

class AreaAPI {

  static final AreaAPI _instance = new AreaAPI._internal();

  String token;

  List<ServiceModel> services;

  factory AreaAPI() {
    return _instance;
  }

  AreaAPI._internal();

  final String baseUrl = "https://area-server-master.herokuapp.com";

  Future<TokenResponse> loginUser(String login, String password) async {
    final hash = sha512.convert(utf8.encode(password));

    final response = await http.post('$baseUrl/auth/signin?username=$login&password=$hash');

    if (response.statusCode == 200) {
      final tok = TokenResponse.fromJson(jsonDecode(response.body));
      token = tok.token;
      return tok;
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

  Future<List<ServiceModel>> getServices() async {
    if (services != null)
      return services;
    final response = await http.get('$baseUrl/list');

    if (response.statusCode == 200) {
      services = (jsonDecode(response.body)['services']).map<ServiceModel>((json) => ServiceModel.fromJson(json)).toList();
      return services;
    } else {
      throw Exception('Failed to retrieve services ' + response.body);
    }
  }

  Future<List<ServiceModel>> getMyServices() async {

    final response = await http.get('$baseUrl/service', headers:
    {
      'authorization': 'Bearer $token'
    });

    if (response.statusCode == 200) {
      print(response.body);
    } else {
      throw Exception('Failed to retrieve user services ' + response.body);
    }
  }

  Future<Map<String, dynamic>> getConnectedServices() async {
    final response = await http.get('$baseUrl/service/list', headers:
    {
      'authorization': 'Bearer $token'
    });

    return json.decode(response.body);
  }

  Future<Response> connectToService(String serviceName) async {

    final connectModel = new ConnectToServiceModel(serviceName);

    final response = await http.post('$baseUrl/service/connect', body: connectModel.toJson(), headers:
    {
      'authorization': 'Bearer $token'
    });

    return response.statusCode == 200 ? response : throw Exception('Faield to connect to service');
  }

}
