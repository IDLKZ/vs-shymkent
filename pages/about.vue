<template>
  <section class="about">
    <div class="container">
      <a href="#" class="linkToTop"></a>
      <ul class="crumbs">
        <li class="crumbs__item">
          <NuxtLink to="/">{{ $t('main') }}</NuxtLink>
        </li>
        <li class="crumbs__item current">
          <NuxtLink to="#">{{ $t('about_city') }}</NuxtLink>
        </li>
      </ul>
      <div class="top-content calendar__top-content">
        <div class="top-content__wrapper top-content__wrapper-7">
          <h2 class="top-content__title">
            {{ $t('about_city') }}
          </h2>
        </div>
        <div class="top-content__line"></div>
      </div>
      <div class="about__content">
        <div class="about__tabs">
          <ul class="about__tabs-caption">
            <li v-for="tab in tabs" :key="tab.id" :class="tab.active" @click="activeTab(tab.id)">
              {{$t(tab.title)}}
            </li>

<!--            <a href="#" class="about__tabs-link">Сохранить</a>-->
<!--            <a href="#" class="about__tabs-link">Поделиться</a>-->
          </ul>
          <div :class="'about__tabs-content'+this.tabs[0].active">
            <div v-if="$i18n.locale == 'kz'">
              <p>
                Халқының саны миллионнан асатын Шымкент қаласы, Қазақстанның Республикалық маңызы бар үш ірі қаласының бірі, оны қоршаған облыстың құрамына кірмейтін жеке әкімшілік-аумақтық бірлік болып табылады. Тұрады
                төрт әкімшілік ауданнан: Абай, Еңбекші, Әл-Фараби және Қаратау аудандары.
              </p>
              <p>
                Оңтүстік аймақтағы ең ірі өнеркәсіптік, сауда және мәдени орталық Өзбекстанмен және Өзбекстанмен шекараларға жақын орналасқан
                Қырғызстан, сондай – ақ олардың астаналары-Ташкент және Бішкек.
              </p>
              <lingallery :iid.sync="currentId" :width="'100%'" :height="'auto'" :items=galleries responsive="true" class="mr-md-6 my-4"/>
              <p>
                Қазіргі Шымкентте 95-тен астам ұлт өкілдері (қазақтар мен орыстар, өзбектер мен татарлар, кәрістер және басқалар) тату тұрады. Халықтың тұрмыс салты, этностық топтардың ортақтығы мен өзіндік ерекшелігі, олардың синтезі – осының бәрі мәдени саясатты қалыптастырды
                қаласы.
              </p>
              <p>
                Табиғаты Шымкент бар демалуға және сауығуға ағза. Қала өзіндік ландшафт аймағында орналасқан және ежелгі дәуірден бастап "бақша қаласы", Жасыл қала деген атқа ие. Өсімдіктер өте алуан түрлілікпен сипатталады. Шымкент сипатталады
                жер асты суларының жоғары тұруы, бұл қала орталығында бірнеше бұлақ көздерінің болуына әкеледі (Қошқарата өзенінің бастауы).
              </p>
              <p>
                Қала аумағына жақын жерде минералды су көздері, жылу көздері бар. Бұл жерлердің емдік климаты кардиологиялық аурулармен ауыратын адамдар үшін пайдалы. Таулы демалыс әуесқойлары үшін көкжиектің шығыс бөлігінде шолу ашылады
                Батыс Тянь-Шань тау жүйесіне кіретін таулы ландшафт. Тау тізбегінің оңтүстік бөлігінде Шымкенттен оңтүстік-шығысқа қарай 40 км жерде орналасқан Қазығұрт тауы (шыңының биіктігі 1768 метр, ұзындығы 20 км) орналасқан. Солтүстікке қарай
                Қазығұрт тауынан Қаржантау тау жотасының көрінісі ашылады (ең биік нүктесі 2823 М, шынжырдың ұзындығы 90 км). Бұл таудың артында Угам жотасы орналасқан (ең биік нүктесі 4299 м, ұзындығы 115 км).
                Шымкент туристер арасында өнертанушылар, тарихшылар мен археологтардың үлкен қызығушылығын тудырып отыр. Дәл осы жерден курорттық, экзотикалық және тарихи орындарға туристік маршруттар басталады, олар Қазақстанның оңтүстігінде аз емес.
              </p>
            </div>
            <div v-if="$i18n.locale == 'ru'">
              <p>
                Город Шымкент, с населением более миллиона человек, один из трёх крупнейших городов Казахстана, имеющих статус республиканского значения, является отдельной административно-территориальной единицей, не входящей в состав окружающей его области. Состоит
                из четырёх административных районов: Абайский, Енбекшинский, Аль-Фарабийский и Каратауский.
              </p>
              <p>
                Самый крупный промышленный, торговый и культурный центр южного региона расположен относительно недалеко от границ с Узбекистаном и
                Кыргызстаном, а также их столиц – Ташкента и Бишкека.
              </p>
              <lingallery :iid.sync="currentId" :width="'100%'" :height="'auto'" :items=galleries responsive="true" class="mr-md-6 my-4"/>
              <p>
                В современном Шымкенте дружно проживают представители более 95 национальностей (казахи и русские, узбеки и татары, корейцы и другие). Жизненный уклад населения, общность и самобытность этнических групп, их синтез – все это сформировало культурную политику
                города.
              </p>
              <p>
                Природа Шымкента располагает к отдыху и оздоровлению организма. Город расположен в своеобразной ландшафтной зоне и с древних времён имеет славу «города-сада», зелёного города. Растительность характеризуется чрезвычайным разнообразием. Шымкент характеризуется
                высоким стоянием подземных вод, что обуславливает наличие нескольких родниковых источников прямо в центре города (исток реки Кошкараты).
              </p>
              <p>
                В ближайшей к территории города области есть источники минеральных вод, термальные источники. Целебный климат этих мест полезен для людей, страдающих кардиологическими заболеваниями. Для любителей горного отдыха - в восточной части горизонта обзору открывается
                горный ландшафт, входящий в горную систему Западного Тянь-Шаня. В южной части горной цепи находится гора Казыгурт (высота пика 1768 метров, длина 20 км), находящаяся в 40 км к юго-востоку от Шымкента. По направлению к северу
                от горы Казыгурт открывается вид на горный хребет Каржантау (наивысшая точка 2823 м, длина цепи 90 км). За этой горой располагается Угамский хребет (наивысшая точка 4299 м, длина 115 км).
                Шымкент вызывает большой интерес у туристов искусствоведов, историков и археологов. Ведь именно отсюда начинается туристические маршруты в курортные, экзотические и исторические места, которых на юге Казахстана довольно не мало.
              </p>
            </div>
            <div v-if="$i18n.locale == 'en'">
              <p>
              The city of Shymkent, with a population of more than a million people, one of the three largest cities of Kazakhstan with the status of republican significance, is a separate administrative-territorial unit that is not part of the surrounding region. Consists
              from four administrative districts: Abay, Enbekshi, Al-Farabi and Karatau.
              </p>
              <p>
                The largest industrial, commercial and cultural center of the southern region is located relatively close to the borders with Uzbekistan and
                Kyrgyzstan, as well as their capitals – Tashkent and Bishkek.
              </p>
              <lingallery :iid.sync="currentId" :width="'100%'" :height="'auto'" :items=galleries responsive="true" class="mr-md-6 my-4"/>
              <p>
                Representatives of more than 95 nationalities (Kazakhs and Russians, Uzbeks and Tatars, Koreans and others) live together in modern Shymkent. The way of life of the population, the community and identity of ethnic groups, their synthesis-all this has formed the cultural policy
                cities.
              </p>
              <p>
                The nature of Shymkent disposes to rest and improvement of the body. The city is located in a kind of landscape zone and since ancient times has the glory of a" garden city", a green city. The vegetation is characterized by extreme diversity. Shymkent is characterized by
                the high standing of underground water, which causes the presence of several spring sources right in the center of the city (the source of the Koshkaraty River).
              </p>
              <p>
                There are mineral water springs and thermal springs in the region closest to the city territory. The healing climate of these places is useful for people suffering from cardiac diseases. For lovers of mountain recreation - in the eastern part of the horizon, the view opens
                a mountain landscape that is part of the Western Tien Shan mountain system. In the southern part of the mountain range there is a mountain Kazygurt (peak height 1768 meters, length 20 km), located 40 km southeast of Shymkent. Towards the north
                Kazygurt Mountain offers a view of the mountain range Karzhantau (the highest point is 2823 m, the chain length is 90 km). Behind this mountain is located Ugamsky ridge (the highest point is 4299 m, length is 115 km).
                Shymkent is of great interest to tourists, art historians, historians and archaeologists. After all, it is from here that tourist routes to resort, exotic and historical places begin, of which there are quite a few in the south of Kazakhstan.
              </p>
            </div>
          </div>
          <div :class="'about__tabs-content'+this.tabs[1].active">
            <div v-if="$i18n.locale == 'kz'">
              <p>
                Қала Ұлы Жібек жолының бір бөлігіндегі керуен жолдарының қиылысында пайда болды. Орта Азияның ежелгі қалаларының құрамына кіреді және бай тарихы мен мәдениеті бар. Қазақстанның көптеген қалаларына қарағанда кеңею кезінде өз негізін алған
                Ресей империясының шекарасы, Шымкент әлдеқайда ертерек құрылған. Ол туралы алғашқы ескерту он бесінші ғасырдың бірінші жартысындағы жазбаша дереккөздерде кездеседі, бірақ қала одан да үлкен деп айтуға толық негіз бар.
              </p>
              <p>
                Археологиялық зерттеулер Шымкентте 2003 жылы ғана басталды. Осы уақытқа дейін ешқандай маңызды зерттеулер жүргізілген жоқ. Қазба жұмыстары кезінде қыш бұйымдар мен басқа да мәдениет пен тұрмыстық заттар табылды
                біздің дәуірімізге дейінгі ғасырлар. Қалаға 2200 жыл болуы әбден мүмкін, алайда қаланы толығымен қиратумен қатар жүргізілген көптеген соғыстардың нәтижесінде біз Шымкенттің ежелгі тарихының баға жетпес ескерткіштерін ешқашан көре алмаймыз.
              </p>
              <p>
                Ұлы Жібек жолының өркендеу дәуірінде Шымкент керуен жолдарының қиылысында тұрған. Бұл қолайлы жағдай, бір жағынан, қалаға даму үшін керемет мүмкіндіктер берді, екінші жағынан, оны көптеген жаулап алушылар үшін тартымды мақсатқа айналдырды.
              </p>
              <p>
                Бұл тринадцатом ғасырда оңтүстік күштеп ұстап, моңғол-татарлар, және бір бөлігі болды Алтын Орда. Он төртінші жылы қанды шайқастардан кейін қала Ақ Орданың иелігіне өтеді. XVI ғасырда Шымкент Қазақ хандығының құрамына кіреді. Кейінірек оның захватывали
                жоңғарлар, одан кейін-қоныстар. Әрбір шайқас жаңа жойылулар әкелді, содан кейін қалпына келтіру кезеңі, келесі жойқын соғысқа дейін. ХІХ ғасырдың екінші жартысында Шымкент Ресей империясының бір бөлігіне айналды
                Ресейдің еуропалық бөлігі, Орта Азия және Батыс Сібір арасындағы маңызды байланыс. Кеңес өкіметінің орнауымен Шымкентте өнеркәсіп белсенді дамып келеді. 1930 жылы қорғасын өндірісі басталды. Ал Ұлы жылдары
                Екінші дүниежүзілік соғыс кезінде Шымкент Кеңес әскерлеріне миллиондаған қорғасын оқтарын жеткізді.
              </p>
            </div>
            <div v-if="$i18n.locale == 'ru'">
              <p>
                Город возник на пересечении караванных дорог одного из отрезков Великого шёлкового пути. Входит в состав древнейших городов Средней Азии и имеет богатую историю и культуру. В отличие от многих городов Казахстана, получивших свое основание во времена расширения
                границ Российской империи, Шымкент основан гораздо раньше. Первые упоминания о нем встречаются в письменных источниках первой половины пятнадцатого века, но есть все основания предполагать, что город еще старше.
              </p>
              <p>
                Археологические исследования начались в Шымкенте лишь в 2003 году. До этого времени никаких серьезных исследований не проводилось. Входе раскопок найдены керамические изделия и другие предметы культуры и быта, относящиеся к концу третьего — началу второго
                веков до нашей эры. Вполне возможно, что городу уже 2200 лет, однако в результате многочисленных войн, сопровождавшихся практически полным разрушением города, мы никогда не увидим бесценные памятники древней истории Шымкента.
              </p>
              <p>
                В эпоху процветания Великого Шелкового Пути Шымкент стоял на перекрестке его караванных дорог. Это выгодное положение, с одной стороны, давало городу прекрасные возможности для развития, с другой — делало его заманчивой мишенью для многочисленных завоевателей.
              </p>
              <p>
                В тринадцатом веке Шымкент был захвачен монголо-татарами и стал частью Золотой Орды. В четырнадцатом, после кровопролитных сражений, город переходит во владения Ак-Орды. В шестнадцатом веке Шымкент входит в состав Казахского ханства. Позже его захватывали
                джунгары, затем — конкандцы. Каждая схватка приносила новые разрушения, потом следовал период восстановления, до очередной разрушительной войны. Во второй половине девятнадцатого века Шымкент становится частью Российской империи
                и важным связующим звеном между европейской частью России, Средней Азией и Западной Сибирью. С приходом советской власти в Шымкенте активно развивается промышленность. В 1930 году начинается производство свинца. А в годы Великой
                Отечественной войны Шымкент поставлял советским войскам миллионы свинцовых пуль.
              </p>
            </div>
            <div v-if="$i18n.locale == 'en'">
              <p>
                The city appeared at the intersection of the caravan roads of one of the segments of the Great Silk Road. It is part of the oldest cities in Central Asia and has a rich history and culture. Unlike many cities of Kazakhstan, which received their foundation during the expansion
                the borders of the Russian Empire, Shymkent was founded much earlier. The first mention of it is found in written sources of the first half of the fifteenth century, but there is every reason to assume that the city is even older.
              </p>
              <p>
                Archaeological research began in Shymkent only in 2003. Up to this time, no serious studies have been conducted. During the excavations, ceramic products and other cultural and everyday objects belonging to the end of the third — the beginning of the second were found
                centuries BC. It is quite possible that the city is already 2200 years old, but as a result of numerous wars, accompanied by the almost complete destruction of the city, we will never see the priceless monuments of the ancient history of Shymkent.
              </p>
              <p>
                In the era of prosperity of the Great Silk Road, Shymkent stood at the crossroads of its caravan roads. This advantageous position, on the one hand, gave the city excellent opportunities for development, on the other — made it a tempting target for numerous conquerors.
              </p>
              <p>
                In the thirteenth century, Shymkent was captured by the Mongol-Tatars and became part of the Golden Horde. In the fourteenth, after bloody battles, the city passes into the possession of the Ak-Horde. In the sixteenth century, Shymkent was part of the Kazakh Khanate. Later he was captured
                the Dzungars, then the Konkandans. Each battle brought new destruction, then followed a period of recovery, before another destructive war. In the second half of the nineteenth century Shymkent became part of the Russian Empire
                and an important link between the European part of Russia, Central Asia and Western Siberia. With the advent of Soviet power, industry is actively developing in Shymkent. In 1930, the production of lead began. And in the years of the Great
                During the Great Patriotic War, Shymkent supplied millions of lead bullets to the Soviet troops.
              </p>
            </div>
          </div>
          <div :class="'about__tabs-content'+this.tabs[2].active">
            <div v-if="$i18n.locale == 'kz'">
              <p>
                Халқы-1 054 413т адам (2020)
              </p>
              <p>
                Тілдер-Қазақ (мемлекеттік), орыс, ағылшын
              </p>
              <p>
                Валютасы-теңге
              </p>
              <p>
                Ауаның орташа жылдық температурасы - +13С
              </p>
              <p>
                Уақыт белдеуі-UTC +6:00
              </p>
              <p>
                Ауданы-1162,8 км2
              </p>
              <p>
                Телефон коды - +7 (725) 2
              </p>
              <p>
                Пошта индексі-160000
              </p>
              <p>
                Автомобиль коды-X, 17
              </p>
              <p>
                Қоғамдық көлікте жол жүру құны-70 тг.
              </p>
            </div>
            <div v-if="$i18n.locale == 'ru'">
              <p>
                Население – 1 054 413т человек (2020)
              </p>
              <p>
                Языки – казахский (государственный), русский, английский
              </p>
              <p>
                Валюта - тенге
              </p>
              <p>
                Среднегодовая температура воздуха – +13С
              </p>
              <p>
                Часовой пояс - UTC +6:00
              </p>
              <p>
                Площадь - 1162,8 км²
              </p>
              <p>
                Телефонный код - +7 (725) 2
              </p>
              <p>
                Почтовый индекс – 160000
              </p>
              <p>
                Автомобильный код – X, 17
              </p>
              <p>
                Стоимость проезда на общественном транспорте – 70 тг.
              </p>
            </div>
            <div v-if="$i18n.locale == 'en'">
              <p>
              Population – 1,054,413 people (2020)
              </p>
              <p>
                Languages-Kazakh (state), Russian, English
              </p>
              <p>
                Currency-tenge
              </p>
              <p>
                The average annual air temperature is +13C
              </p>
              <p>
                Time zone-UTC +6: 00
                < / p>
              <p>
                Area - 1162.8 km2
                < / p>
              <p>
                The phone code is +7 (725) 2
              </p>
              <p>
                Postal code – 160000
              </p>
              <p>
                Car code-X, 17
                < / p>
              <p>
                The cost of public transport is 70 tenge.
              </p>
            </div>
          </div>
          <div class="my-5 py-5">
          <yandex-share :services="['vkontakte','facebook','twitter','whatsapp','telegram']" counter />
          </div>
        </div>
      </div>

    </div>
  </section>
</template>

<script>
import Lingallery from "lingallery";

export default {
  name: "about",
  components:{
    Lingallery
  },
  data(){
    return {
      tabs: [
        {
          id: 0,
          // title: 'Шымкент в наши дни',
          title: 'about_shymkent',
          active: 'active'
        },
        {
          id: 1,
          title: 'about_history',
          active: ''
        },
        {
          id: 2,
          title: 'about_directory',
          active: ''
        },
        // {
        //   id: 3,
        //   title: 'Фотогалерея',
        //   active: ''
        // }
      ],
      galleries: [
        {
          id:1,
          src:'/images/about/1.jpg' ,
          thumbnail:'/images/about/1.jpg'
        },
        {
          id:2,
          src:'/images/about/2.jpg' ,
          thumbnail:'/images/about/2.jpg'
        },
        {
          id:3,
          src:'/images/about/3.jpg' ,
          thumbnail:'/images/about/3.jpg'
        },
        {
          id:4,
          src:'/images/about/4.jpg' ,
          thumbnail:'/images/about/4.jpg'
        },
        {
          id:5,
          src:'/images/about/5.jpg' ,
          thumbnail:'/images/about/5.jpg'
        },
        {
          id:6,
          src:'/images/about/6.jpg' ,
          thumbnail:'/images/about/6.jpg'
        },
        {
          id:7,
          src:'/images/about/7.jpg' ,
          thumbnail:'/images/about/7.jpg'
        },
        {
          id:8,
          src:'/images/about/8.jpg' ,
          thumbnail:'/images/about/8.jpg'
        },
        {
          id:9,
          src:'/images/about/9.jpg' ,
          thumbnail:'/images/about/9.jpg'
        },
        {
          id:10,
          src:'/images/about/10.jpg' ,
          thumbnail:'/images/about/10.jpg'
        },
        {
          id:11,
          src:'/images/about/11.jpg' ,
          thumbnail:'/images/about/11.jpg'
        },
        {
          id:12,
          src:'/images/about/12.jpg' ,
          thumbnail:'/images/about/12.jpg'
        },
        {
          id:13,
          src:'/images/about/13.jpg' ,
          thumbnail:'/images/about/13.jpg'
        },
        {
          id:14,
          src:'/images/about/14.jpg' ,
          thumbnail:'/images/about/14.jpg'
        },
      ],
      currentId:null,
    }
  },
  methods:{
    getImages(data){
      return this.$store.state.image.image + data ;
    },
    truncate(string, value) {
      return string.substring(0, value) + '...';
    },
    activeTab(i){
      this.tabs.forEach((item,i) => {
        item.active = ''
      })
      this.tabs[i].active = 'active'
    },
  },
}
</script>

<style scoped>

</style>
