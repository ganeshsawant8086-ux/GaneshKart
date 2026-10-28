const https = require('https');
const fs = require('fs');
const path = require('path');

function checkPhotoUrl(url) {
  return new Promise((resolve) => {
    try {
      const u = new URL(url);
      const req = https.get(u, { headers: { 'User-Agent': 'Mozilla/5.0' } }, (res) => {
        resolve(res.statusCode === 200);
      });
      req.on('error', () => resolve(false));
      req.setTimeout(4000, () => {
        req.destroy();
        resolve(false);
      });
    } catch {
      resolve(false);
    }
  });
}

// Candidates for 6 categories: 40 candidates each
const CANDIDATES = {
  Mobiles: [
    'photo-1695048133142-1a20484d2569',
    'photo-1510557880182-3d4d3cba35a5',
    'photo-1592750475338-74b7b21085ab',
    'photo-1511707171634-5f897ff02aa9',
    'photo-1598327105666-5b89351aff97',
    'photo-1610945265064-0e34e5519bbf',
    'photo-1580910051074-3eb694886505',
    'photo-1565849904461-04a58ad377e0',
    'photo-1574944985070-8f3ebc6b79d2',
    'photo-1601784551446-20c9e07cdbdb',
    'photo-1546868871-7041f2a55e12',
    'photo-1575695342320-d2d2d2f9b73f',
    'photo-1585060544812-6b45742d762f',
    'photo-1591337676887-a217a6970a8a',
    'photo-1567581935884-3349723552ca',
    'photo-1533228896884-6a8f9312804b',
    'photo-1546790852-24d1559726b5',
    'photo-1570891836654-d4961a7b6929',
    'photo-1592899677977-9c10ca588bbd',
    'photo-1589492477829-5e65395b66cc',
    'photo-1569770218135-bea267ed7e84',
    'photo-1509741102003-ca64bfe5f069',
    'photo-1525598912003-663126343e1f',
    'photo-1584006682522-dc17d6c0d9ac',
    'photo-1556656793-08538906a9f8',
    'photo-1587033411391-5d9e51cce126',
    'photo-1605236453806-6ff36851218e',
    'photo-1550745165-9bc0b252726f',
    'photo-1530319067432-f2a729c03db5',
    'photo-1512499617640-c74ae3a79d37',
    'photo-1565630916779-e303be97b6f5',
    'photo-1572569511254-d8f925fe2cbb',
    'photo-1584438784894-089d6a62b8fa',
    'photo-1523206489230-c012c64b2b48',
    'photo-1568707043650-eb03f2ac3730',
    'photo-1583573636246-18cb2246697f',
    'photo-1541345023926-55d6e0853f4b',
    'photo-1557180295-76eee20ae8aa',
    'photo-1574944985170-8b309745293c'
  ],
  Electronics: [
    'photo-1517336714731-489689fd1ca8',
    'photo-1611186871348-b1ce696e52c9',
    'photo-1544244015-0df4b3ffc6b0',
    'photo-1585790050230-5dd28404ccb9',
    'photo-1508685096489-7aacd43bd3b1',
    'photo-1523275335684-37898b6baf30',
    'photo-1590658268037-6bf12165a8df',
    'photo-1546435770-a3e426bf472b',
    'photo-1505740420928-5e560c06d30e',
    'photo-1606813907291-d86efa9b94db',
    'photo-1607604276583-eef5d076aa5f',
    'photo-1545454675-3531b543be5d',
    'photo-1588872657578-7efd1f1555ed',
    'photo-1541807084-5c52b6b3adef',
    'photo-1527443224154-c4a3942d3acf',
    'photo-1516035069371-29a1b244cc32',
    'photo-1502920917128-1aa500764cbd',
    'photo-1508700115892-45ecd05ae2ad',
    'photo-1600003014755-ba31aa59c4b6',
    'photo-1578303512597-81e6cc155b3e',
    'photo-1513258496099-48168024aec0',
    'photo-1546980468-7eaeb47f4a27',
    'photo-1525547719571-a2d4ac8945e2',
    'photo-1496181133206-80ce9b88a853',
    'photo-1519389950473-47ba0277781c',
    'photo-1587829741301-dc798b83add3',
    'photo-1583394838336-acd977736f90',
    'photo-1543512214-318c7553f230',
    'photo-1526738549149-8e07eca6c147',
    'photo-1563245372-f21724e3856d',
    'photo-1550009158-9ebf69173e03',
    'photo-1512499617640-c74ae3a79d37',
    'photo-1544717305-2782549b5136',
    'photo-1579586337278-3befd40fd17a',
    'photo-1515940175183-6798529cb860',
    'photo-1593642632823-8f785ba67e45',
    'photo-1593642702821-c8da6771f0c6'
  ],
  Appliances: [
    'photo-1593359677879-a4bb92f829d1',
    'photo-1593784991095-a205069470b6',
    'photo-1571175443880-49e1d25b2bc5',
    'photo-1584992236310-6edddc08acff',
    'photo-1626806787461-102c1bfaaea1',
    'photo-1582735689369-4fe89db7114c',
    'photo-1585515320310-259814833e62',
    'photo-1584269600519-112d071b35e6',
    'photo-1558317374-067fb5f30001',
    'photo-1585338447937-70c22592fc92',
    'photo-1517668808822-9ebb02ae2a0e',
    'photo-1514432324607-a09d9b4aefdd',
    'photo-1585338107529-13afc5f02586',
    'photo-1616486338812-3dadae4b4ace',
    'photo-1585659722983-3a675dabf23d',
    'photo-1574269909862-7e1d70bb8078',
    'photo-1556911220-e15b29be8c8f',
    'photo-1570222094114-d054a817e56b',
    'photo-1584622650111-993a426fbf0a',
    'photo-1583863788434-e58a36330cf0',
    'photo-1544816155-12df9643f363',
    'photo-1574269909862-7e1d70bb8078',
    'photo-1584269600464-37b1b58a9fe7',
    'photo-1520699049698-acd2fccb8cc8',
    'photo-1556909114-f6e7ad7d3136',
    'photo-1588854337236-6889d631faa8',
    'photo-1610557892470-55d9e80c0bce',
    'photo-1584622781564-1d987f7333c1',
    'photo-1585338107529-13afc5f02586',
    'photo-1556912172-45b7abe8b7e1',
    'photo-1556911073-38141963c9e0',
    'photo-1586208958839-06c17cacdf08',
    'photo-1585338447937-70c22592fc92',
    'photo-1585659722983-3a675dabf23d',
    'photo-1540555700478-4be289fbecef',
    'photo-1527515637462-cff94eecc1ac',
    'photo-1507089947368-19c1da9775ae'
  ],
  Fashion: [
    'photo-1583391733956-3750e0ff4e8b',
    'photo-1594938298603-c8148c4dae35',
    'photo-1610030469983-98e550d6193c',
    'photo-1524805444758-089113d48a6d',
    'photo-1522335789203-aabd1fc54bc9',
    'photo-1542291026-7eec264c27ff',
    'photo-1584735935682-2f2b69dff9d2',
    'photo-1595950653106-6c9ebd614d3a',
    'photo-1572635196237-14b3f281503f',
    'photo-1541099649105-f69ad21f3246',
    'photo-1576995853123-5a10305d93c0',
    'photo-1521572267360-ee0c2909d518',
    'photo-1584917865442-de89df76afd3',
    'photo-1553062407-98eeb64c6a62',
    'photo-1548036328-c9fa89d128fa',
    'photo-1515886657613-9f3515b0c78f',
    'photo-1529139574466-a303027c1d8b',
    'photo-1490481651871-ab68de25d43d',
    'photo-1434389677669-e08b4cac3105',
    'photo-1512436991641-6745cdb1723f',
    'photo-1445205170230-053b83016050',
    'photo-1469334031218-e382a71b716b',
    'photo-1509631179647-0177331693ae',
    'photo-1516762689617-e1cffcef479d',
    'photo-1485230895905-ec40ba36b9bc',
    'photo-1492707892479-7bc8d5a4ee93',
    'photo-1539109136881-3be0616acf4b',
    'photo-1483985988355-763728e1935b',
    'photo-1508296695146-257a814070b4',
    'photo-1551488831-00ddcb6c6bd3',
    'photo-1534528741775-53994a69daeb',
    'photo-1515372039744-b8f02a3ae446',
    'photo-1523381210434-271e8be1f52b',
    'photo-1489987707025-afc232f7ea0f',
    'photo-1560343090-f0409e92791a',
    'photo-1549298916-b41d501d3772',
    'photo-1591047139829-d91aecb6caea'
  ],
  'Home & Kitchen': [
    'photo-1584269600464-37b1b58a9fe7',
    'photo-1584269600519-112d071b35e6',
    'photo-1602143407151-7111542de6e8',
    'photo-1590736969955-71cc94801759',
    'photo-1522771739844-6a9f6d5f14af',
    'photo-1631679706909-1844bbd07221',
    'photo-1507473885765-e6ed057f782c',
    'photo-1586023492125-27b2c045efd7',
    'photo-1538688525198-9b88f6f53126',
    'photo-1517256064527-09c73fc73e38',
    'photo-1563861826100-9cb868fdbe1c',
    'photo-1555041469-a586c61ea9bc',
    'photo-1513694203232-719a280e022f',
    'photo-1524758631624-e2822e304c36',
    'photo-1540574163026-643ea20ade25',
    'photo-1505693416388-ac5ce068fe85',
    'photo-1493663284031-b7e3aefcae8e',
    'photo-1484154218962-a197022b5858',
    'photo-1501183638710-841dd1904471',
    'photo-1489171078254-c3365d6e359f',
    'photo-1513161455079-7dc1de15ef3e',
    'photo-1534349762230-e0cadf78f5da',
    'photo-1507089947368-19c1da9775ae',
    'photo-1519710164239-da123dc03ef4',
    'photo-1532323544230-7191fd51bc1b',
    'photo-1512918728675-ed5a9ecdebfd',
    'photo-1556228453-efd6c1ff04f6',
    'photo-1583847268964-b28dc8f51f92',
    'photo-1586023492125-27b2c045efd7',
    'photo-1544457070-4cd773b4d71e',
    'photo-1581539250439-c96689b516dd',
    'photo-1517705008128-361805f42e86',
    'photo-1524758631624-e2822e304c36',
    'photo-1556911220-e15b29be8c8f',
    'photo-1530595467537-0b5996c41f2d',
    'photo-1544816155-12df9643f363',
    'photo-1517256064527-09c73fc73e38'
  ],
  Grocery: [
    'photo-1576092768241-dec231879fc3',
    'photo-1559056199-641a0ac8b55e',
    'photo-1544787219-7f47ccb76574',
    'photo-1474979266404-7eaacbcd87c5',
    'photo-1586201375761-83865001e31c',
    'photo-1589301760014-d929f3979dbc',
    'photo-1582293041079-7814c2f12063',
    'photo-1549007994-cb92caebd54b',
    'photo-1508061253366-f7da158b6d46',
    'photo-1567620905732-2d1ec7ab7445',
    'photo-1514733670139-4d87a1941d55',
    'photo-1509440159596-0249088772ff',
    'photo-1546069901-ba9599a7e63c',
    'photo-1540420773420-3366772f4999',
    'photo-1563861826100-9cb868fdbe1c',
    'photo-1512621776951-a57141f2eefd',
    'photo-1505252585461-04db1eb84625',
    'photo-1498837167922-ddd27525d352',
    'photo-1490645935967-10de6ba17061',
    'photo-1504674900247-0877df9cc836',
    'photo-1495521821757-a1efb6729352',
    'photo-1476224203421-9ac39bcb3327',
    'photo-1482049016688-2d3e1b311543',
    'photo-1484723091739-00a6a2e5866e',
    'photo-1517256064527-09c73fc73e38',
    'photo-1497034825429-c343d7c6a68f',
    'photo-1504754524776-8f4f37790ca0',
    'photo-1499028344343-cd173efc68a9',
    'photo-1496116218417-1a781b1c416c',
    'photo-1473093295043-cdd812d0e601',
    'photo-1506084868230-bb9d95c24759',
    'photo-1467003909585-2f8a72700288',
    'photo-1478145046317-39f10e56b5e9',
    'photo-1497888329096-51c27beff665',
    'photo-1481931098730-318b6f776db0',
    'photo-1505576399279-565b52d4ac71'
  ]
};

(async () => {
  console.log('Testing Unsplash candidate photos...');
  const verifiedByCategory = {};
  const globalSeen = new Set();

  for (const cat of Object.keys(CANDIDATES)) {
    verifiedByCategory[cat] = [];
    const list = CANDIDATES[cat];
    for (const id of list) {
      if (globalSeen.has(id)) continue;
      const url = `https://images.unsplash.com/${id}?auto=format&fit=crop&w=800&q=80`;
      const ok = await checkPhotoUrl(url);
      if (ok) {
        globalSeen.add(id);
        verifiedByCategory[cat].push(url);
      }
      if (verifiedByCategory[cat].length >= 30) break;
    }
    console.log(`Category "${cat}": ${verifiedByCategory[cat].length} unique verified images`);
  }

  fs.writeFileSync(path.join(__dirname, 'verified_photos.json'), JSON.stringify(verifiedByCategory, null, 2));
  console.log('Saved verified_photos.json!');
})();

