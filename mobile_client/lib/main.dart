import 'package:flappy_search_bar/flappy_search_bar.dart';
import 'package:flappy_search_bar/search_bar_style.dart';
import 'package:flutter/material.dart';
import 'package:google_fonts/google_fonts.dart';
import 'package:mobile_client/Views/Customs/CustomCell.dart';
import 'package:mobile_client/Views/ReactionsPage.dart';

import 'Views/LoginPage.dart';


Map<int, Color> color =
{
  50:Color.fromRGBO(136,14,79, .1),
  100:Color.fromRGBO(136,14,79, .2),
  200:Color.fromRGBO(136,14,79, .3),
  300:Color.fromRGBO(136,14,79, .4),
  400:Color.fromRGBO(136,14,79, .5),
  500:Color.fromRGBO(136,14,79, .6),
  600:Color.fromRGBO(136,14,79, .7),
  700:Color.fromRGBO(136,14,79, .8),
  800:Color.fromRGBO(136,14,79, .9),
  900:Color.fromRGBO(136,14,79, 1),
};

void main() => runApp(MyApp());

class MyApp extends StatelessWidget {
  // This widget is the root of your application.
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Flutter Demo',
      theme: ThemeData(
        primarySwatch: MaterialColor(0xFFFFFFFF, color),
        canvasColor: Colors.white,
        textTheme: GoogleFonts.robotoTextTheme(
          Theme.of(context).textTheme,
        ),
      ),
      home: LoginPage(), // MyHomePage(title: 'AREA'),
    );
  }
}

class MyHomePage extends StatefulWidget {
  MyHomePage({Key key, this.title}) : super(key: key);

  final String title;

  @override
  _MyHomePageState createState() => _MyHomePageState();
}

class _MyHomePageState extends State<MyHomePage> {
  int _counter = 0;

  void _incrementCounter() {
    setState(() {
      _counter++;
    });
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text(widget.title),
      ),
      body: NestedScrollView(
        headerSliverBuilder: (BuildContext context, bool innerBoxIsScrolled) {
          return <Widget>[
            PageHeader()
          ];
        },
        body:
          PageView(children: [
            buildPageContent()
          ]),
      )
    );
  }

  Widget PageHeader()
  {
    return SliverAppBar(
        expandedHeight: 160.0,
        flexibleSpace: FlexibleSpaceBar(
            background: Padding(
              padding: EdgeInsets.only(left: 12, right: 12, top: 12),
              child: CustomScrollView(
                slivers: <Widget>[
                  SliverToBoxAdapter(
                    child: Container(
                      height: 80,
                      child: SearchBar(
                        hintText: "Service, action, etc.",
                        searchBarStyle: SearchBarStyle(
                          backgroundColor: Colors.white,
                          borderRadius: BorderRadius.all(Radius.circular(8.0))),
                        onSearch: (x) async { performSearch(x); return <String>[];}, onItemFound: (String item, int index) {  } ,
                    ))
                  ),
                  SliverToBoxAdapter(
                    child: Container(
                      height: 20,
                      child: Row(
                        mainAxisAlignment: MainAxisAlignment.center,
                        children: <Widget>[
                          Image.network("https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Google_%22G%22_Logo.svg/1004px-Google_%22G%22_Logo.svg.png", height: 20, width: 20),
                          Padding(
                            padding: const EdgeInsets.only(left: 16.0),
                            child: Image.network("https://upload.wikimedia.org/wikipedia/commons/0/05/Facebook_Logo_%282019%29.png", height: 20, width: 20),
                          ),
                          Padding(
                              padding: const EdgeInsets.only(left: 16.0),
                              child: Opacity(opacity: 0.3, child: Image.network("https://upload.wikimedia.org/wikipedia/commons/thumb/d/d3/Microsoft_Office_OneDrive_%282018%E2%80%93present%29.svg/1200px-Microsoft_Office_OneDrive_%282018%E2%80%93present%29.svg.png", height: 20, width: 20)),
                          ),
                          Padding(
                            padding: const EdgeInsets.only(left: 16.0),
                            child: Opacity(opacity: 0.3, child: Image.network("https://upload.wikimedia.org/wikipedia/commons/thumb/0/04/Microsoft_Office_Yammer_%282018%E2%80%93present%29.svg/144px-Microsoft_Office_Yammer_%282018%E2%80%93present%29.svg.png", height: 20, width: 20)),
                          ),

                        ],
                      ),
                    )
                  ),
                ]
              )
          )
      )
    );
  }

  List<String> results = [];

  Widget buildPageContent() => ListView.separated(
      itemBuilder: (BuildContext context, int index) {
        return CustomCell(Icons.favorite_border, results[index], 3);
      },
      separatorBuilder: (BuildContext context, int index) => Divider(thickness: 1),
      itemCount: results.length);

  void performSearch(String string)
  {
    /*var te = data.where((element) => element.toLowerCase().contains(string.toLowerCase())).toList();

    setState(() {
      this.results = te;
    }); */
  }

}
