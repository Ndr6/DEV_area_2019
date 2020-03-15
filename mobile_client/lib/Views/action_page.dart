import 'package:flutter/material.dart';
import 'package:mobile_client/Models/ServiceModel.dart' as ServiceModel;
import 'package:mobile_client/WebService/AreaAPI.dart';
import 'package:mobile_client/widgets/SimpleFormBuilder.dart';

class ActionPage extends StatefulWidget {
  final ServiceModel.ServiceModel service;
  final ServiceModel.Actions action;

  ActionPage({Key key, this.service, this.action}) : super(key: key);

  @override
  _ActionPageState createState() => _ActionPageState();
}

class _ActionPageState extends State<ActionPage> {
  ServiceModel.Reaction selected;
  Map<String, dynamic> params = {};

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text("Ajouter une réaction"),
      ),
      body: ListView(
        children: <Widget>[
          new DropdownButton<ServiceModel.Reaction>(
            items: widget.service.reactions
                .map((e) =>
                DropdownMenuItem<ServiceModel.Reaction>(
                  value: e,
                  child: Column(
                    children: [
                      Text(e.name, style: TextStyle(fontWeight: FontWeight.bold), overflow: TextOverflow.ellipsis,),
                      Text(e.description, overflow: TextOverflow.ellipsis,),
                    ],
                  ),
                ))
                .toList(),
            onChanged: (ServiceModel.Reaction value) {
              setState(() {
                this.selected = value;
              });
            },
          ),
          selected != null ? SimpleFormBuilder(
            config: selected.parameters.toList(), onSubmitted: (Map<String, dynamic> json) {
            setState(() {
              this.params = json;
            });
          },) : Container(),
          new FlatButton(
              onPressed: (() async {
                if (selected == null)
                  return;
                try {
                  await AreaAPI().linkActionReaction(this.widget.action, this.selected, this.params);
                } catch (e) {
                  showDialog(context: context, builder: (context) =>
                      AlertDialog(
                        title: Text("Error"),
                        content: Text(e.toString()),
                        actions: <Widget>[
                          FlatButton(
                            onPressed: () => Navigator.of(context).pop(),
                            child: Text("Fermer"),
                          )
                        ],
                      ));
                }
                Navigator.of(context).pop();
              }),
              child: new Text(
                "Valider",
                style: TextStyle(color: Colors.black),
              ))
        ],
      ),
    );
  }
}
