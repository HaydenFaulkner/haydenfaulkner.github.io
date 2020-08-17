import * as THREE from './three.module.js';
import {OrbitControls} from './OrbitControls.js';


function main() {
  const canvas = document.querySelector('#c');
  const renderer = new THREE.WebGLRenderer({canvas});

  const fov = 75;
  const aspect = 2;
  const near = 0.1;
  const far = 25;
  const camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
  camera.position.z = 10;

  const controls = new OrbitControls(camera, canvas);
  controls.minDistance = 2; // the minimum distance the camera must have from center
  controls.maxDistance = 15; // the maximum distance the camera must have from center
  controls.zoomSpeed = 0.8; // control the zoomIn and zoomOut speed
  controls.rotateSpeed = 0.8; // control the rotate speed
  controls.target.set(0, 0, 0);
  controls.autoRotate = true;
  controls.autoRotateSpeed = 1.0;
  controls.enablePan = false;

  controls.update();

  function rgb(r, g, b) {
    return (new THREE.Color()).setRGB(r/255, g/255, b/255);
  }
  
  function add_text( text )
  {
    var fontface = "Arial";
    var fontsize = 40;
    
    var canvas = document.createElement('canvas');
    var context = canvas.getContext('2d');
    context.font = fontsize + "px " + fontface;
    context.fillStyle = "rgba(60, 60, 60, 1.0)";
		context.textAlign = "center";
    context.fillText( text, canvas.width/2, canvas.height/2 + fontsize*0.3);
    
    // canvas contents will be used for a texture
    var texture = new THREE.Texture(canvas)
    texture.needsUpdate = true;

    var spriteMaterial = new THREE.SpriteMaterial( 
      { map: texture, fog: true } );
    spriteMaterial.depthWrite = false;
    spriteMaterial.depthTest = false;
    var sprite = new THREE.Sprite( spriteMaterial );
    sprite.scale.set(1.5,1)
    
    return sprite;	
  }

  const scene = new THREE.Scene();
  scene.background = rgb(230, 230, 230);
  const light = new THREE.AmbientLight(rgb(230, 230, 230));
  scene.add(light);
  scene.fog = new THREE.FogExp2(scene.background, 0.05);

  function addPoint(word, x, y, z) {
    const geometry = new THREE.SphereGeometry( 0.1, 32, 32 );
    const material = new THREE.MeshPhongMaterial({
      color: rgb(16, 110, 234),
      opacity: 0.3,
      transparent: true,
    });

    var groupi = new THREE.Group();
    const cube = new THREE.Mesh(geometry, material);
    cube.position.set(x, y, z);
    groupi.add(cube);

    var text_canv = add_text(word);
    text_canv.position.set(x, y, z);
    groupi.add( text_canv );

    return groupi;
  }

  
  var group = new THREE.Group();
  group.add( addPoint("a", -2.230688,  -3.722707,  -1.140288));
  group.add( addPoint("np", -2.420603,  -6.472246,  -0.114399));
  group.add( addPoint("fp", -4.697281,  2.521376,  3.639520));
  group.add( addPoint("serve", 2.584164,  -4.228540,  -1.025450));
  group.add( addPoint("the", 4.438946,  -2.167556,  1.794357));
  group.add( addPoint("return", -2.100093,  -0.295504,  0.171516));
  group.add( addPoint("ls", -4.100943,  -4.462605,  -0.105036));
  group.add( addPoint("rs", -1.704546,  -5.228408,  0.922702));
  group.add( addPoint("good", 2.401680,  -0.665734,  -1.708577));
  group.add( addPoint("rally", 2.445483,  -5.567396,  2.109488));
  group.add( addPoint("to", -0.272474,  1.031218,  1.679393));
  group.add( addPoint("it", 4.696352,  -3.702420,  2.685456));
  group.add( addPoint("winner", -2.730489,  3.381659,  -2.665014));
  group.add( addPoint("in", 2.342187,  -0.359379,  0.101697));
  group.add( addPoint("quick", 2.338558,  1.530955,  -1.186535));
  group.add( addPoint("returns", -2.064218,  -4.685995,  3.070313));
  group.add( addPoint("fault", 3.695209,  3.004726,  -2.643022));
  group.add( addPoint("first", -2.583624,  -1.750149,  5.845817));
  group.add( addPoint("down", -3.442585,  3.386691,  -0.680558));
  group.add( addPoint("line", -2.833477,  2.332489,  -1.327303));
  group.add( addPoint("net", 0.017934,  4.672002,  2.338935));
  group.add( addPoint("cross-court", -3.622772,  0.552643,  3.583991));
  group.add( addPoint("hits", -3.459850,  -5.185914,  -1.696119));
  group.add( addPoint("at", -0.807578,  -3.208267,  -4.893377));
  group.add( addPoint("fine", 2.812789,  2.434756,  -4.424889));
  group.add( addPoint("t", -0.030367,  -3.430152,  -5.702276));
  group.add( addPoint("court", -5.170291,  0.588017,  3.035967));
  group.add( addPoint("serves", 1.324931,  -3.677969,  -0.758947));
  group.add( addPoint("middle", 1.531178,  -5.219658,  -2.744407));
  group.add( addPoint("of", -4.808583,  -0.654066,  1.486364));
  group.add( addPoint("short", 1.210744,  -4.014492,  1.910458));
  group.add( addPoint("fails", -2.884225,  1.804080,  5.084081));
  group.add( addPoint("crafts", -1.620285,  -1.861131,  1.333516));
  group.add( addPoint("delivers", -1.377237,  -1.129008,  4.145252));
  group.add( addPoint("slice", 1.497177,  -0.742974,  -3.772464));
  group.add( addPoint("brief", 2.058087,  -3.920897,  1.468130));
  group.add( addPoint("works", -1.881152,  -2.048153,  0.045011));
  group.add( addPoint("shots", -4.396092,  -1.538506,  2.189003));
  group.add( addPoint("exchanged", -5.249923,  -2.247984,  -1.347237));
  group.add( addPoint("couple", -4.899614,  -2.313165,  0.235864));
  group.add( addPoint("back", 0.862177,  -1.156602,  1.430659));
  group.add( addPoint("one", 3.421895,  -1.006775,  -3.224454));
  group.add( addPoint("goes", -5.248755,  0.983358,  -2.987441));
  group.add( addPoint("but", -0.173051,  2.297230,  0.302071));
  group.add( addPoint("is", -5.106006,  2.312409,  -0.642734));
  group.add( addPoint("ace", 2.365755,  -2.839471,  -2.018981));
  group.add( addPoint("outside", -3.981430,  -4.338039,  2.693421));
  group.add( addPoint("unable", -1.822092,  -8.560948,  0.886174));
  group.add( addPoint("struggles", 3.598215,  -4.088674,  -2.808633));
  group.add( addPoint("puts", 2.840028,  1.327327,  2.304871));
  group.add( addPoint("into", 3.167103,  3.663807,  0.396391));
  group.add( addPoint("put", 3.464163,  2.012322,  3.852685));
  group.add( addPoint("angled", 1.393149,  -1.859272,  -2.809313));
  group.add( addPoint("clear", 0.341205,  3.028027,  1.771477));
  group.add( addPoint("aimed", -1.668366,  5.764727,  1.977207));
  group.add( addPoint("for", 1.824847,  1.943305,  0.863928));
  group.add( addPoint("and", 1.362658,  3.808334,  4.796298));
  group.add( addPoint("only", 5.196605,  -3.893635,  5.845616));
  group.add( addPoint("kick", 1.059229,  -2.690192,  0.845609));
  group.add( addPoint("keep", -1.734823,  3.234519,  4.494928));
  group.add( addPoint("with", -2.264046,  -3.171001,  2.521495));
  group.add( addPoint("bodyline", -0.388071,  5.181440,  -2.262846));
  group.add( addPoint("high", 3.173701,  -1.235925,  -5.040020));
  group.add( addPoint("aims", -1.713658,  -2.150941,  -1.397697));
  group.add( addPoint("sends", -3.555964,  -1.228259,  -1.158196));
  group.add( addPoint("flat", -0.080500,  1.791546,  -4.051967));
  group.add( addPoint("nice", 2.215540,  4.029009,  -4.127419));
  group.add( addPoint("volley", -1.301687,  -0.652185,  2.377417));
  group.add( addPoint("produces", -0.868359,  -5.820069,  2.420145));
  group.add( addPoint("huge", -1.243940,  4.223598,  -3.863428));
  group.add( addPoint("arrows", 0.525516,  -3.409198,  -1.680788));
  group.add( addPoint("lands", -3.899845,  -0.257024,  4.870200));
  group.add( addPoint("double", 1.898184,  2.809392,  -3.738011));
  group.add( addPoint("inside", 0.202255,  3.512763,  -4.644998));
  group.add( addPoint("misses", -0.780478,  2.710854,  -0.461144));
  group.add( addPoint("manages", 1.702168,  4.891836,  3.149162));
  group.add( addPoint("by", -1.162544,  -3.225598,  -2.936933));
  group.add( addPoint("returning", -2.169277,  -0.125467,  -1.019023));
  group.add( addPoint("difficulty", 3.108772,  1.032839,  0.356523));
  group.add( addPoint("faces", 3.427256,  4.007678,  2.360544));
  group.add( addPoint("heavy", 4.752868,  -0.055006,  -0.371445));
  group.add( addPoint("out-wide", 0.639217,  -0.610579,  -2.195524));
  group.add( addPoint("touch", 33.758233,  15.097003,  6.721445));
  group.add( addPoint("out", -3.037123,  -0.338025,  -4.473469));
  group.add( addPoint("catches", 2.017328,  2.934129,  2.987052));
  group.add( addPoint("sharp", 1.451188,  0.604537,  -3.883162));
  group.add( addPoint("blasts", -3.728981,  -2.787716,  1.313218));
  group.add( addPoint("reaches", 2.855805,  0.094397,  3.661065));
  group.add( addPoint("thumps", -4.937381,  0.479404,  -1.271400));
  group.add( addPoint("wide", -3.826319,  -3.025096,  3.978747));
  group.add( addPoint("whips", -0.028854,  -5.928629,  1.410229));
  group.add( addPoint("target", 4.971558,  -2.097411,  0.295766));
  group.add( addPoint("comes", 0.381530,  2.928391,  3.543191));
  group.add( addPoint("smacks", 3.561624,  -2.704451,  -3.819422));
  group.add( addPoint("flies", -6.157618,  -1.798285,  2.288456));
  group.add( addPoint("pointed", -1.534883,  -1.452942,  -3.965204));
  group.add( addPoint("strokes", 0.259037,  -0.545161,  4.146057));
  group.add( addPoint("placed", 5.973025,  -0.944525,  -0.700955));
  group.add( addPoint("answer", 2.166788,  3.453386,  -1.040640));
  group.add( addPoint("flashes", -2.134927,  1.041940,  1.609377));
  group.add( addPoint("has", 5.694947,  -3.908972,  -0.048300));
  group.add( addPoint("no", -1.088854,  -2.557243,  3.538738));
  group.add( addPoint("sprays", 6.835065,  15.506936,  2.560665));
  group.add( addPoint("acute", 0.653149,  -0.114222,  -4.031436));
  group.add( addPoint("long", 4.210838,  -0.018939,  1.338788));
  group.add( addPoint("guided", 0.583469,  15.627656,  -1.653625));
  group.add( addPoint("straight", 2.134452,  3.230223,  1.308926));
  group.add( addPoint("quickly", 3.509365,  1.585235,  -1.733632));
  group.add( addPoint("sent", -2.569493,  -4.341272,  -3.219893));
  group.add( addPoint("nets", 0.660392,  4.239682,  0.565073));
  group.add( addPoint("volleys", -6.387932,  -1.043301,  -0.294671));
  group.add( addPoint("let", 5.633600,  1.427392,  -1.078614));
  group.add( addPoint("play", -0.863178,  -0.214037,  -3.141939));
  group.add( addPoint("out-side", 0.626467,  1.062288,  -2.585601));
  group.add( addPoint("rushes", -0.623216,  1.931566,  3.291644));
  group.add( addPoint("land", -0.287312,  2.880324,  5.258793));
  group.add( addPoint("pulls", -0.335892,  5.995359,  -3.967151));
  group.add( addPoint("cord", 5.188394,  3.459845,  -1.059229));
  group.add( addPoint("over-cooks", 1.400502,  -0.598734,  -5.708116));
  group.add( addPoint("gigantic", -0.336582,  -1.115870,  -5.389369));
  group.add( addPoint("over-hits", 1.195699,  0.574234,  -0.581453));
  group.add( addPoint("dumps", 20.511337,  -7.655000,  -6.885957));
  group.add( addPoint("towards", 3.447403,  0.876149,  -5.010947));
  group.add( addPoint("kicks", -2.548486,  -3.098834,  0.575920));
  group.add( addPoint("moves", -0.582397,  2.174877,  -5.623445));
  group.add( addPoint("intense", 3.081892,  -0.889764,  1.624144));
  group.add( addPoint("mighty", 3.663109,  2.703688,  -0.330517));
  group.add( addPoint("pushes", -2.619994,  2.035479,  1.208154));
  group.add( addPoint("cannon", 3.717654,  -1.113844,  -0.502515));
  group.add( addPoint("generates", 1.239952,  -2.180571,  -4.584713));
  group.add( addPoint("second", 2.199651,  -2.012130,  -0.033298));
  group.add( addPoint("hammers", -0.405318,  -1.408751,  -0.894499));
  group.add( addPoint("lightening", -1.491894,  1.592295,  -3.400467));
  group.add( addPoint("shoots", 0.006982,  -2.673119,  4.782403));
  group.add( addPoint("contensted", -4.286190,  7.165921,  2.539446));
  group.add( addPoint("well", -2.727933,  -0.204109,  1.739873));
  group.add( addPoint("fought", 0.581318,  3.872387,  -0.857385));
  group.add( addPoint("hard", 3.004497,  -3.400988,  3.537929));
  group.add( addPoint("again", 1.414193,  4.764565,  -2.405573));
  group.add( addPoint("sizzling", 5.451441,  0.963773,  1.138714));
  group.add( addPoint("massive", -1.114278,  0.891917,  4.702525));
  group.add( addPoint("control", -1.194893,  1.454110,  -1.563100));
  group.add( addPoint("fast", -0.098581,  6.143596,  0.733010));
  group.add( addPoint("slices", -4.546151,  -0.555165,  -2.811082));
  group.add( addPoint("digs", -6.088873,  1.522526,  0.931271));
  group.add( addPoint("barely", -2.304893,  -2.713674,  -4.156877));
  group.add( addPoint("low", 2.389088,  0.606855,  -2.990164));
  group.add( addPoint("punches", 4.171217,  0.945591,  -4.036388));
  group.add( addPoint("touches", 16.148035,  -22.949163,  9.220459));
  group.add( addPoint("wayward", -4.735000,  -0.698988,  -0.455415));
  group.add( addPoint("smashes", -0.520688,  0.415003,  0.053221));
  group.add( addPoint("finds", -2.231706,  4.236133,  0.139770));
  group.add( addPoint("monumental", 0.682800,  -3.498471,  -3.582157));
  group.add( addPoint("will", -3.182350,  1.752952,  -3.750263));
  group.add( addPoint("off", -6.118080,  -0.276932,  2.210207));
  group.add( addPoint("drops", -1.269135,  3.983738,  0.777392));
  group.add( addPoint("box", 4.686132,  1.268898,  2.722044));
  group.add( addPoint("paced", 5.664792,  -1.509778,  -1.674368));
  group.add( addPoint("service", 2.780780,  -5.794156,  -0.509003));
  group.add( addPoint("slaps", 0.899194,  -1.890921,  -1.173493));
  group.add( addPoint("charges", -2.358010,  2.456279,  2.970826));
  group.add( addPoint("an", 0.113501,  0.088016,  -6.937946));
  group.add( addPoint("forth", 7.001943,  1.281424,  -2.062271));
  group.add( addPoint("able", -2.310254,  1.284536,  -5.349914));
  group.add( addPoint("not", -3.237117,  3.782457,  2.314239));
  group.add( addPoint("closer", 1.256671,  1.533742,  2.358581));
  group.add( addPoint("runs", 4.566258,  1.805915,  0.119223));
  group.add( addPoint("execute", -1.689878,  0.590087,  3.337003));
  group.add( addPoint("properly", 1.769617,  -3.285125,  -3.836006));
  group.add( addPoint("places", -2.637597,  -1.926426,  -2.639380));
  group.add( addPoint("cracks", -3.434494,  1.271490,  2.336086));
  group.add( addPoint("exchange", -0.074627,  0.826997,  6.096490));
  group.add( addPoint("between", -2.693312,  -0.167523,  -2.657479));
  group.add( addPoint("lengthy", -1.207016,  2.368820,  2.048048));
  group.add( addPoint("players", -0.251818,  -1.680104,  -2.202301));
  group.add( addPoint("upto", 4.121282,  2.418681,  1.843799));
  group.add( addPoint("extended", 4.556552,  4.645872,  0.869830));
  group.add( addPoint("surges", -4.395611,  3.033675,  1.254177));
  group.add( addPoint("makes", 3.992153,  1.344636,  -2.980949));
  group.add( addPoint("near", 0.052897,  -7.201095,  -0.483806));
  group.add( addPoint("attempts", 3.118595,  3.771717,  -2.297841));
  group.add( addPoint("drop-shot", -2.993162,  -0.984052,  3.566892));
  group.add( addPoint("outruns", 1.774665,  -0.128833,  2.277587));
  group.add( addPoint("onto", -0.891016,  -3.582564,  -1.054669));
  group.add( addPoint("lob", 1.179658,  6.039327,  -0.898785));
  group.add( addPoint("!", 3.282091,  -2.663668,  0.506364));
  group.add( addPoint("make", 1.374216,  2.712738,  -0.491314));
  group.add( addPoint("outsmarts", -2.483855,  5.115019,  -1.810175));
  group.add( addPoint("tries", -0.426042,  -0.021244,  -1.376986));
  group.add( addPoint("do", -0.909150,  3.947569,  2.525329));
  group.add( addPoint("over", 1.150900,  -1.633049,  3.354590));
  group.add( addPoint("so", 6.000820,  2.718402,  0.608175));
  group.add( addPoint("from", -0.062828,  -4.926160,  -2.589568));
  group.add( addPoint("corner", 1.342104,  2.449589,  -2.703248));
  group.add( addPoint("few", -4.113792,  -3.284588,  -1.863941));
  group.add( addPoint("just", -3.715307,  1.685431,  0.049295));
  group.add( addPoint("plants", -0.222612,  -2.384743,  -0.221297));
  group.add( addPoint("mesmerizing", -1.749268,  1.050826,  -2.286020));
  group.add( addPoint("which", -2.891950,  -4.623753,  0.544730));
  group.add( addPoint("doesn't", 3.676800,  -4.652522,  0.820354));
  group.add( addPoint("it's", 3.837804,  -1.848606,  -1.862100));
  group.add( addPoint("that", 1.145562,  -2.923162,  3.492792));
  group.add( addPoint("sails", 3.126701,  -5.795463,  -2.537509));
  group.add( addPoint("#l#", -0.202786,  -2.533011,  2.120102));
  group.add( addPoint("great", 5.536260,  -0.943005,  2.012786));
  group.add( addPoint("miss-hits", -3.185041,  -0.711608,  8.456462));
  group.add( addPoint("slams", 2.427576,  -2.252669,  2.147369));
  group.add( addPoint("smash", 0.637870,  10.953154,  -3.005387));
  group.add( addPoint("falters", -3.453064,  -1.405676,  0.423676));
  group.add( addPoint("get", -3.574477,  1.285703,  -1.385199));
  group.add( addPoint("follows", 1.575973,  12.362052,  -1.356717));
  group.add( addPoint("before", -4.110264,  3.515812,  -1.974252));
  group.add( addPoint("clips", 1.066586,  0.487465,  0.909180));
  group.add( addPoint("fp's", 0.091627,  -0.260277,  2.819405));
  group.add( addPoint("on", -4.283620,  0.298090,  0.844581));
  group.add( addPoint("overcooks", 1.671130,  0.519232,  -5.742562));
  group.add( addPoint("tape", 1.641795,  -5.696623,  1.209408));
  group.add( addPoint("then", -1.269086,  3.824631,  -1.569480));
  group.add( addPoint("#w#", 2.099471,  5.466504,  0.793162));
  group.add( addPoint("ball", 1.465484,  -0.038833,  5.321047));
  group.add( addPoint("coming", 3.392188,  0.318894,  -0.984361));
  group.add( addPoint("exquisite", -1.814232,  1.432709,  -0.043676));
  group.add( addPoint("hitting", 4.129574,  -1.378083,  3.067682));
  group.add( addPoint("miss-hit", -0.498190,  -1.400810,  5.637445));
  group.add( addPoint("run", 2.347089,  -1.574169,  3.938779));
  group.add( addPoint("courts", -2.672154,  -1.819673,  2.685346));
  group.add( addPoint("deep", 0.661316,  -0.693536,  -0.063642));
  group.add( addPoint("diving", 4.263428,  -3.386539,  -1.202334));
  group.add( addPoint("falls", -0.423143,  -1.003546,  1.060473));
  group.add( addPoint("gets", 2.639952,  -1.951461,  5.649641));
  group.add( addPoint("guides", -1.622734,  -3.150150,  4.578583));
  group.add( addPoint("half-volley", 1.270615,  2.313177,  -6.046549));
  group.add( addPoint("hit", 1.726749,  2.448589,  4.889496));
  group.add( addPoint("miss", 5.095425,  -0.173404,  -2.305232));
  group.add( addPoint("np's", -0.250947,  -1.753444,  -3.813780));
  group.add( addPoint("past", -0.801754,  5.852526,  0.128590));
  group.add( addPoint("putting", -2.668805,  7.212628,  -1.660996));
  group.add( addPoint("racquet", 0.408681,  1.680529,  -1.270021));
  group.add( addPoint("replies", -0.004220,  -5.240357,  -0.433897));
  group.add( addPoint("server", 3.005715,  0.889244,  5.354427));
  group.add( addPoint("shallow", -5.110305,  -3.703635,  1.248113));
  group.add( addPoint("smashing", 0.116103,  -3.863485,  0.438906));
  group.add( addPoint("stretches", -2.242103,  4.823153,  3.492468));
  group.add( addPoint("stretching", 7.334233,  -0.329654,  -0.630805));
  group.add( addPoint("tap", 2.522835,  4.751955,  0.114598));
  group.add( addPoint("taps", -1.089496,  -3.646754,  1.265884));
  group.add( addPoint("testing", 0.791493,  0.970611,  3.896129));
  group.add( addPoint("through", -0.026537,  -4.287738,  3.441172));
  group.add( addPoint("way", -0.226592,  2.991768,  -2.465842));
  group.add( addPoint("within", -0.948082,  -5.341981,  -0.965764));
  scene.add(group)

  
  

  function resizeRendererToDisplaySize(renderer) {
    const canvas = renderer.domElement;
    const width = canvas.clientWidth;
    const height = canvas.clientHeight;
    const needResize = canvas.width !== width || canvas.height !== height;
    if (needResize) {
      renderer.setSize(width, height, false);
    }
    return needResize;
  }

  let renderRequested = false;

  function animate() {	
  
  	requestAnimationFrame( animate );
		controls.update();
    renderer.clear();
    renderer.render(scene, camera);
  }
	
  function render() {
    
  renderRequested = undefined;
    
    if (resizeRendererToDisplaySize(renderer)) {
      const canvas = renderer.domElement;
      camera.aspect = canvas.clientWidth / canvas.clientHeight;
      camera.updateProjectionMatrix();
    }

    renderer.clear();
    renderer.render(scene, camera);
  }
  render();
  animate();
  
  function requestRenderIfNotRequested() {
    if (!renderRequested) {
      renderRequested = true;
      requestAnimationFrame(render);
    }
  }

  controls.addEventListener('change', requestRenderIfNotRequested);
  window.addEventListener('resize', requestRenderIfNotRequested);

}
main();
