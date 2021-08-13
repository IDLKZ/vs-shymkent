<template>
  <section class="about">
    <div class="container">
      <a href="#" class="linkToTop"></a>
      <ul class="crumbs">
        <li class="crumbs__item">
          <NuxtLink to="/">Главная</NuxtLink>
        </li>
        <li class="crumbs__item current">
          <NuxtLink to="#">О городе</NuxtLink>
        </li>
      </ul>
      <div class="top-content calendar__top-content">
        <div class="top-content__wrapper top-content__wrapper-7">
          <h2 class="top-content__title">
            О городе
          </h2>
        </div>
        <div class="top-content__line"></div>
      </div>
      <div class="about__content">
        <div class="about__tabs">
          <ul class="about__tabs-caption">
            <li v-for="tab in tabs" :key="tab.id" :class="tab.active" @click="activeTab(tab.id)">
              {{tab.title}}
            </li>
<!--            <a href="#" class="about__tabs-link">Сохранить</a>-->
<!--            <a href="#" class="about__tabs-link">Поделиться</a>-->
          </ul>
          <div :class="'about__tabs-content'+this.tabs[0].active">
            <p>
              Город Шымкент, с населением более миллиона человек, один из трёх крупнейших городов Казахстана, имеющих статус республиканского значения, является отдельной административно-территориальной единицей, не входящей в состав окружающей его области. Состоит
              из четырёх административных районов: Абайский, Енбекшинский, Аль-Фарабийский и Каратауский.
            </p>
            <p>
              Самый крупный промышленный, торговый и культурный центр южного региона расположен относительно недалеко от границ с Узбекистаном и
              Кыргызстаном, а также их столиц – Ташкента и Бишкека.
            </p>
            <lingallery :iid.sync="currentId" :width="'100%'" :height="'auto'" :items=galleries responsive="true" class="mr-md-6"/>
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
          <div :class="'about__tabs-content'+this.tabs[1].active">
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
          <div :class="'about__tabs-content'+this.tabs[2].active">
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
          <div :class="'about__tabs-content'+this.tabs[3].active">
            <div class="about__gallery-tabs">
              <ul class="about__gallery-tabs-caption">
                <li class="active">Все фотографии</li>
                <li>Из истории города</li>
              </ul>
              <div class="about__gallery-tabs-content active">
                <div class="about__gallery-popup" id="second-gallery">
                  <a href="https://avatanplus.com/files/effects/original/583eb65914425158b4f84bfb.jpg" title="The Cleaner"><img src="https://avatanplus.com/files/effects/original/583eb65914425158b4f84bfb.jpg"></a>
                  <a href="https://hd-wallpapersfd.info/wp-content/uploads/HTML/Wallpaper-Mountain/Wallpaper-Mountain85.jpg" title="Winter Dance"><img src="https://hd-wallpapersfd.info/wp-content/uploads/HTML/Wallpaper-Mountain/Wallpaper-Mountain85.jpg"></a>
                  <a href="/images/about-img.jpg" title="The Uninvited Guest"><img src="/images/about-img.jpg"></a>
                  <a href="http://farm9.staticflickr.com/8383/8563475581_df05e9906d_b.jpg" title="Oh no, not again!"><img src="http://farm9.staticflickr.com/8383/8563475581_df05e9906d_s.jpg"></a>
                  <a href="http://farm9.staticflickr.com/8235/8559402846_8b7f82e05d_b.jpg" title="Swan Lake"><img src="http://farm9.staticflickr.com/8235/8559402846_8b7f82e05d_s.jpg"></a>
                  <a href="http://farm9.staticflickr.com/8235/8558295467_e89e95e05a_b.jpg" title="The Shake"><img src="http://farm9.staticflickr.com/8235/8558295467_e89e95e05a_s.jpg"></a>
                  <a href="http://farm9.staticflickr.com/8378/8559402848_9fcd90d20b_b.jpg" title="Who's that, mommy?"><img src="http://farm9.staticflickr.com/8378/8559402848_9fcd90d20b_s.jpg"></a>
                  <a href="https://avatanplus.com/files/effects/original/583eb65914425158b4f84bfb.jpg" title="The Cleaner"><img src="https://avatanplus.com/files/effects/original/583eb65914425158b4f84bfb.jpg"></a>
                  <a href="https://hd-wallpapersfd.info/wp-content/uploads/HTML/Wallpaper-Mountain/Wallpaper-Mountain85.jpg" title="Winter Dance"><img src="https://hd-wallpapersfd.info/wp-content/uploads/HTML/Wallpaper-Mountain/Wallpaper-Mountain85.jpg"></a>
                  <a href="/images/about-img.jpg" title="The Uninvited Guest"><img src="/images/about-img.jpg"></a>
                  <a href="http://farm9.staticflickr.com/8383/8563475581_df05e9906d_b.jpg" title="Oh no, not again!"><img src="http://farm9.staticflickr.com/8383/8563475581_df05e9906d_s.jpg"></a>
                  <a href="http://farm9.staticflickr.com/8235/8559402846_8b7f82e05d_b.jpg" title="Swan Lake"><img src="http://farm9.staticflickr.com/8235/8559402846_8b7f82e05d_s.jpg"></a>
                </div>
              </div>
              <div class="about__gallery-tabs-content">
                <div class="about__gallery-popup" id="first-gallery">
                  <a href="https://hd-wallpapersfd.info/wp-content/uploads/HTML/Wallpaper-Mountain/Wallpaper-Mountain85.jpg" title="Winter Dance"><img src="https://hd-wallpapersfd.info/wp-content/uploads/HTML/Wallpaper-Mountain/Wallpaper-Mountain85.jpg"></a>
                  <a href="/images/about-img.jpg" title="The Uninvited Guest"><img src="/images/about-img.jpg"></a>
                  <a href="http://farm9.staticflickr.com/8235/8558295467_e89e95e05a_b.jpg" title="The Shake"><img src="http://farm9.staticflickr.com/8235/8558295467_e89e95e05a_s.jpg"></a>
                  <a href="http://farm9.staticflickr.com/8378/8559402848_9fcd90d20b_b.jpg" title="Who's that, mommy?"><img src="http://farm9.staticflickr.com/8378/8559402848_9fcd90d20b_s.jpg"></a>
                  <a href="https://avatanplus.com/files/effects/original/583eb65914425158b4f84bfb.jpg" title="The Cleaner"><img src="https://avatanplus.com/files/effects/original/583eb65914425158b4f84bfb.jpg"></a>
                  <a href="https://hd-wallpapersfd.info/wp-content/uploads/HTML/Wallpaper-Mountain/Wallpaper-Mountain85.jpg" title="Winter Dance"><img src="https://hd-wallpapersfd.info/wp-content/uploads/HTML/Wallpaper-Mountain/Wallpaper-Mountain85.jpg"></a>
                  <a href="http://farm9.staticflickr.com/8383/8563475581_df05e9906d_b.jpg" title="Oh no, not again!"><img src="http://farm9.staticflickr.com/8383/8563475581_df05e9906d_s.jpg"></a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="post__btns">
        <button class="post__btn">
          <?xml version="1.0" ?><svg data-name="Livello 1" id="Livello_1" viewBox="0 0 128 128" xmlns="http://www.w3.org/2000/svg"><title/><path d="M98.78,0H29.22A7.21,7.21,0,0,0,22,7.19V120.8a7.08,7.08,0,0,0,4.42,6.63,7.22,7.22,0,0,0,7.87-1.5L63.14,97.59a1.23,1.23,0,0,1,1.72,0l28.86,28.33a7.21,7.21,0,0,0,7.87,1.5A7.08,7.08,0,0,0,106,120.8V7.19A7.21,7.21,0,0,0,98.78,0ZM100,120.8a1.14,1.14,0,0,1-.74,1.09,1.17,1.17,0,0,1-1.34-.25h0L69.06,93.31a7.26,7.26,0,0,0-10.13,0L30.08,121.64a1.18,1.18,0,0,1-1.34.25A1.14,1.14,0,0,1,28,120.8V7.19A1.21,1.21,0,0,1,29.22,6H98.78A1.21,1.21,0,0,1,100,7.19Z"/></svg>
          Сохранить
        </button>
        <button class="post__btn">
          <svg xmlns="http://www.w3.org/2000/svg" width="11.052" height="11.056" viewBox="0 0 11.052 11.056"><path d="M11.052,5.525,6.014,0V3.31H5.428A5.428,5.428,0,0,0,0,8.738v2.318L.967,10A6.939,6.939,0,0,1,6.014,7.741V11.05ZM.648,9.39V8.738a4.78,4.78,0,0,1,4.78-4.781H6.661V1.672l3.514,3.853L6.661,9.378V7.093H6.08A7.588,7.588,0,0,0,.648,9.39Zm0,0"/></svg>
          Поделиться
        </button>
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
          title: 'Шымкент в наши дни',
          active: 'active'
        },
        {
          id: 1,
          title: 'История',
          active: ''
        },
        {
          id: 2,
          title: 'Для справки',
          active: ''
        },
        {
          id: 3,
          title: 'Фотогалерея',
          active: ''
        }
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
    }
  },
}
</script>

<style scoped>

</style>
