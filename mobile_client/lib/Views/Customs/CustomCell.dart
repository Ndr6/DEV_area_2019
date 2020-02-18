import 'package:flutter/material.dart';
import 'package:mobile_client/Views/Customs/PinnedWidget.dart';

class CustomCell extends StatelessWidget
{

  IconData _icon;
  String _title;
  int _nbResponders;

  CustomCell(this._icon, this._title, this._nbResponders);

  @override
  Widget build(BuildContext context) {
    // TODO: implement build
    return Padding(
      padding: const EdgeInsets.all(8.0),
      child: Row(
        crossAxisAlignment: CrossAxisAlignment.center,
        children: <Widget>[
          PinnedWidget(
            alignment: Alignment.topLeft,
            number: this._nbResponders,
            child: Icon(this._icon)
          ),
          Expanded(
            child: Padding(
              padding: const EdgeInsets.only(left: 16.0),
              child: Align(
                alignment: Alignment.centerLeft,
                child: Text(this._title),
              ),
            ),
          ),
          Icon(Icons.chevron_right)
        ],
      )
    );
  }

}