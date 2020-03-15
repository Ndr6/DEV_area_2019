import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:flutter_form_builder/flutter_form_builder.dart';
import 'package:mobile_client/Models/ServiceModel.dart';

typedef JsonWidgetBuilder = Widget Function(BuildContext, String, Parameters);

class SimpleFormBuilder extends StatefulWidget {
  final List<Parameters> config;

  final Function(Map<String, dynamic> json) onSubmitted;

  const SimpleFormBuilder({Key key, @required this.config, @required this.onSubmitted}) : super(key: key);

  @override
  _JsonFormBuilderState createState() => _JsonFormBuilderState();
}

class _JsonFormBuilderState extends State<SimpleFormBuilder> {
  final Map<String, dynamic> _output = {};

  final GlobalKey<FormBuilderState> _fbKey = GlobalKey<FormBuilderState>();

  final Map<String, JsonWidgetBuilder> _widgetMap = {};

  final Map<String, FocusNode> _focusNodes = {};

  @override
  void initState() {
    super.initState();
    this._widgetMap["string"] = buildTextField;
    this._widgetMap["bool"] = buildCheckbox;
    this._widgetMap["int"] = buildNumberPicker;
    this._output.addEntries(this.widget.config.map((config) => MapEntry(config.name, null)));
    this._focusNodes.addEntries(this.widget.config.map((config) => MapEntry(config.name, FocusNode(debugLabel: config.name))));
  }

  @override
  void dispose() {
    this._focusNodes.forEach((key, node) => node.dispose());
    super.dispose();
  }

  InputDecoration _buildFieldInputDecoration(Parameters config) {
    return InputDecoration(
      labelText: config.name,
      hintText: config.name,
    );
  }

  Widget buildTextField(context, key, Parameters config) {
    return FormBuilderTextField(
      attribute: key,
      focusNode: this._focusNodes[key],
      valueTransformer: (value) => (value as String).trim(),
      decoration: _buildFieldInputDecoration(config),
      onEditingComplete: () => FocusScope.of(context).nextFocus(),
    );
  }

  Widget buildNumberPicker(context, key, Parameters config) {
    return FormBuilderTextField(
      attribute: key,
      inputFormatters: <TextInputFormatter>[
        WhitelistingTextInputFormatter.digitsOnly
      ],
      keyboardType: TextInputType.numberWithOptions(signed: false, decimal: false),
      focusNode: this._focusNodes[key],
      valueTransformer: (value) => int.parse(value as String),
      decoration: _buildFieldInputDecoration(config),
      onEditingComplete: () => FocusScope.of(context).nextFocus(),
    );
  }

  Widget buildCheckbox(context, key, Parameters config) {
    return FormBuilderCheckbox(
      label: Padding(
        padding: const EdgeInsets.all(8.0),
        child: Text(config.name),
      ),
      attribute: key,
    );
  }
/*
  Widget buildDropdown(context, key, config) {
    return FormBuilderDropdown(
      items: config['items']
          .map((item) => DropdownMenuItem(
                value: item,
                child: Text(item),
              ))
          .toList(),
      attribute: key,
      decoration: _buildFieldInputDecoration(config),
    );
  }*/

  Widget generateWidget(BuildContext context, String key, Parameters config) {
    return this._widgetMap[config.type.toLowerCase()](context, key, config);
  }

  @override
  Widget build(BuildContext context) {
    return FormBuilder(
        key: _fbKey,
        autovalidate: true,
        onChanged: (json) => widget.onSubmitted(_output),
        initialValue: Map.fromEntries(
          this
              .widget.config
              .map((entry) => MapEntry(entry.name, null)),
        ),
        child: DefaultFocusTraversal(
          policy: WidgetOrderFocusTraversalPolicy(),
          child: Column(
            children:
                (this.widget.config.map((config) => generateWidget(context, config.name, config)).toList())
                    .map((item) => Padding(
                          padding: EdgeInsets.symmetric(horizontal: 16.0, vertical: 8.0),
                          child: item,
                        ))
                    .toList(),
          ),
        ));
  }
}
