import 'package:flutter/material.dart';
import 'package:mobile_client/Views/Customs/PinnedWidget.dart';
import 'package:mobile_client/widgets/json_form_builder.dart';

class CustomCell extends StatelessWidget
{

  IconData _icon;
  String _title;
  int _nbResponders;
  GestureTapCallback onTap;


  CustomCell(this._icon, this._title, this._nbResponders, {this.onTap});

  @override
  Widget build(BuildContext context) {
    return GestureDetector(
      behavior: HitTestBehavior.translucent,
      onTap: this.onTap,
      child: Padding(
        padding: const EdgeInsets.all(8.0),
        child: Row(
          crossAxisAlignment: CrossAxisAlignment.center,
          children: <Widget>[
            Expanded(
              child: Padding(
                padding: const EdgeInsets.only(left: 16.0),
                  child: Align(
                    alignment: Alignment.centerLeft,
                    child: Text(this._title, style: TextStyle(fontWeight: FontWeight.bold),),
                  ),
              ),
            ),
            Icon(Icons.chevron_right)
          ],
        )
      ),
    );
  }

}