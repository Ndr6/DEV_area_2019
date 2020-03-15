import 'dart:core';

class ConnectToServiceModel {

  String serviceName;
  List<String> parameters;

  ConnectToServiceModel(this.serviceName, this.parameters);

  ConnectToServiceModel.fromJson(Map<String, dynamic> json) {
      this.serviceName = json['name'];
      this.parameters = json['params'];
  }

  Map<String, dynamic> toJson() {
    final Map<String, dynamic> data = new Map<String, dynamic>();

    data['name'] = this.serviceName;
    data['params'] = "[]";

    return data;
  }

}