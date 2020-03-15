class ConnectedServicesModel {
  bool success;
  Services services;

  ConnectedServicesModel({this.success, this.services});

  ConnectedServicesModel.fromJson(Map<String, dynamic> json) {
    success = json['success'];
    services = json['services'] != null
        ? new Services.fromJson(json['services'])
        : null;
  }

  Map<String, dynamic> toJson() {
    final Map<String, dynamic> data = new Map<String, dynamic>();
    data['success'] = this.success;
    if (this.services != null) {
      data['services'] = this.services.toJson();
    }
    return data;
  }
}

class Services {
  bool intra;
  bool google;
  bool twitter;
  bool discord;
  bool api;
  bool smtp;
  bool rss;
  bool iss;
  bool pornhub;
  bool time;
  bool debug;

  Services(
      {this.intra,
        this.google,
        this.twitter,
        this.discord,
        this.api,
        this.smtp,
        this.rss,
        this.iss,
        this.pornhub,
        this.time,
        this.debug});

  Services.fromJson(Map<String, dynamic> json) {
    intra = json['intra'];
    google = json['google'];
    twitter = json['twitter'];
    discord = json['discord'];
    api = json['api'];
    smtp = json['smtp'];
    rss = json['rss'];
    iss = json['iss'];
    pornhub = json['pornhub'];
    time = json['time'];
    debug = json['debug'];
  }

  Map<String, dynamic> toJson() {
    final Map<String, dynamic> data = new Map<String, dynamic>();
    data['intra'] = this.intra;
    data['google'] = this.google;
    data['twitter'] = this.twitter;
    data['discord'] = this.discord;
    data['api'] = this.api;
    data['smtp'] = this.smtp;
    data['rss'] = this.rss;
    data['iss'] = this.iss;
    data['pornhub'] = this.pornhub;
    data['time'] = this.time;
    data['debug'] = this.debug;
    return data;
  }
}