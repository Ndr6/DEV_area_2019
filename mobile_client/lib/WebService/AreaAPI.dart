import 'dart:convert';
import 'dart:io';
import 'package:http/http.dart' as http;
import 'package:crypto/crypto.dart';
import 'package:http/http.dart';
import 'package:mobile_client/Models/ConnectToServiceModel.dart';
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

  Future<String> createAction(String type, {Map<String, dynamic> params = const {}}) async {
    final response = await http.post('$baseUrl/action/$type', headers: {
      HttpHeaders.authorizationHeader: "Bearer $token",
      HttpHeaders.contentTypeHeader: ContentType.json.toString(),
    }, body: jsonEncode(params));

    if (response.statusCode == 200) {
      return (jsonDecode(response.body)['id']);
    } else {
      throw Exception('Failed to create action: ' + response.body);
    }
  }

  Future<String> createReaction(String type, {Map<String, dynamic> params = const {}}) async {
    final response = await http.post('$baseUrl/reaction/$type', headers: {
      HttpHeaders.authorizationHeader: "Bearer $token",
      HttpHeaders.contentTypeHeader: ContentType.json.toString(),
    }, body: jsonEncode(params));

    if (response.statusCode == 200) {
      return (jsonDecode(response.body)['id']);
    } else {
      throw Exception('Failed to create reaction: ' + response.body);
    }
  }

  Future<bool> postLink(String actionId, String reactionId) async {
    final response = await http.patch('$baseUrl/action/link', headers: {
      HttpHeaders.authorizationHeader: "Bearer $token",
      HttpHeaders.contentTypeHeader: ContentType.json.toString(),
    }, body: jsonEncode({"actionId": actionId, "reactionId": reactionId}));

    if (response.statusCode == 200) {
      return (jsonDecode(response.body)['success']);
    } else {
      throw Exception('Failed to create link: ' + response.body);
    }
  }

  Future<void> linkActionReaction(Actions action, Reaction reaction, Map<String, dynamic> reactionParams) async {
    final String actionId = await createAction(action.name);
    final String reactionId = await createReaction(reaction.name, params: reactionParams);
    print("created action $actionId and reaction $reactionId");
    await postLink(actionId, reactionId);
    print("link success");
  }

  Future<TokenResponse> registerUser(String login, String password) async {
    final hash = sha512.convert(utf8.encode(password));

    final response = await http.post('$baseUrl/auth/signup?username=$login&password=$hash');

    if (response.statusCode == 200) {
      final tok = TokenResponse.fromJson(jsonDecode(response.body));
      token = tok.token;
      return tok;
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

    final response = await http.get('$baseUrl/service', headers: {
      HttpHeaders.authorizationHeader: "Bearer $token",
    });

    if (response.statusCode == 200) {
      return (jsonDecode(response.body)).map<ServiceModel>((json) => ServiceModel.fromJson(json)).toList();
    } else {
      throw Exception('Failed to retrieve services ' + response.body);
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
