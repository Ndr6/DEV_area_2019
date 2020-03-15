import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'package:mobile_client/Models/ServiceModel.dart' as ServiceModel;
import 'package:mobile_client/Views/action_page.dart';

import 'CustomCell.dart';

class ActionCell extends StatelessWidget {
  final ServiceModel.ServiceModel service;
  final ServiceModel.Actions action;

  ActionCell({@required this.action, @required this.service});

  @override
  Widget build(BuildContext context) {
    return CustomCell(
      Icons.info,
      this.action.name,
      0,
      onTap: () => Navigator.push(
        context,
        MaterialPageRoute(
          builder: (context) => ActionPage(
            service: this.service,
            action: this.action,
          ),
        ),
      ),
    );
  }
}
