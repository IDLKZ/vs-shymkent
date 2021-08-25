<template>
  <section class="blog-list">
    <div class="container">
      <ul class="crumbs">
        <li class="crumbs__item">
          <a href="/">Главная</a>
        </li>
        <li class="crumbs__item current">
          <a href="#">Блог</a>
        </li>
      </ul>
      <div class="top-content">
        <div class="top-content__wrapper top-content__wrapper-6">
          <h2 class="top-content__title">
            Блоги
          </h2>
          <p class="top-content__text">
            Турим и не только
          </p>
        </div>
        <div class="top-content__line"></div>
      </div>
      <div class="blog-list__tabs">
        <ul class="blog-list__tabs-caption">
          <li>Все</li>
          <li>Места</li>
          <li>Мнения</li>
          <li>Кухня</li>
          <li>Интервью2</li>
          <li>Авторы</li>
        </ul>
        <div class="blog-list__select-inner">
          <div class="blog-list__select-wrapper select__wrapper">
            <div class="blog-list__select-label select__label">Сортировка:</div>
            <div class="blog-list__select select">
              <div class="blog-list__select-header select__header">
                                <span class="blog-list__select-current select__current">
                                    По дате выхода
                                </span>
                <div class="blog-list__select-icon select__icon"></div>
              </div>
              <div class="blog-list__select-body select__body">
                <div class="blog-list__select-item select__item active">По дате выхода</div>
                <div class="blog-list__select-item select__item">По популярности</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="blog-list__authors">
        <div class="blog-list__authors-categories">
          <h3 class="blog-list__categories-title">
            Категории
          </h3>
          <ul class="blog-list__authors-categories-list">
            <li>
              <input type="checkbox" id="c1">
              <label for="c1">Все</label>
            </li>
            <li>
              <input type="checkbox" id="c2">
              <label for="c2">Интервью</label>
            </li>
            <li>
              <input type="checkbox" id="c3">
              <label for="c3">Места</label>
            </li>
            <li>
              <input type="checkbox" id="c4">
              <label for="c4">Кухня</label>
            </li>
            <li>
              <input type="checkbox" id="c5">
              <label for="c5">Мнения</label>
            </li>
          </ul>
        </div>
        <div class="blog-list__authors-content">
          <div class="blog-list__authors-search-inner">
            <input id="blog-list__authors-search" type="search" placeholder="Введите имя автора">
            <label for="blog-list__authors-search"></label>
          </div>
          <div class="blog-list__authors-list">
            <div class="blog-list__author-item">
              <a href="#" class="blog-list__author-title">
                Абдураимова Санобар
              </a>
              <p class="blog-list__author-notecount">Количество записей: <span>5</span></p>
              <div class="blog-list__author-categories-wrapper">
                <span>Категории:</span>
                <ul class="blog-list__author-categories">
                  <li>
                    <a href="#">#Интервью</a>
                  </li>
                  <li>
                    <a href="#">#Места</a>
                  </li>
                  <li>
                    <a href="#">#Кухня</a>
                  </li>
                  <li>
                    <a href="#">#Мнения</a>
                  </li>
                </ul>
              </div>
            </div>
            <div class="blog-list__author-item">
              <a href="#" class="blog-list__author-title">
                Абдураимова Санобар
              </a>
              <p class="blog-list__author-notecount">Количество записей: <span>5</span></p>
              <div class="blog-list__author-categories-wrapper">
                <span>Категории:</span>
                <ul class="blog-list__author-categories">
                  <li>
                    <a href="#">#Интервью</a>
                  </li>
                  <li>
                    <a href="#">#Места</a>
                  </li>
                  <li>
                    <a href="#">#Кухня</a>
                  </li>
                  <li>
                    <a href="#">#Мнения</a>
                  </li>
                </ul>
              </div>
            </div>
            <div class="blog-list__author-item">
              <a href="#" class="blog-list__author-title">
                Абдураимова Санобар
              </a>
              <p class="blog-list__author-notecount">Количество записей: <span>5</span></p>
              <div class="blog-list__author-categories-wrapper">
                <span>Категории:</span>
                <ul class="blog-list__author-categories">
                  <li>
                    <a href="#">#Интервью</a>
                  </li>
                  <li>
                    <a href="#">#Места</a>
                  </li>
                  <li>
                    <a href="#">#Кухня</a>
                  </li>
                  <li>
                    <a href="#">#Мнения</a>
                  </li>
                </ul>
              </div>
            </div>
            <div class="blog-list__author-item">
              <a href="#" class="blog-list__author-title">
                Абдураимова Санобар
              </a>
              <p class="blog-list__author-notecount">Количество записей: <span>5</span></p>
              <div class="blog-list__author-categories-wrapper">
                <span>Категории:</span>
                <ul class="blog-list__author-categories">
                  <li>
                    <a href="#">#Интервью</a>
                  </li>
                  <li>
                    <a href="#">#Места</a>
                  </li>
                  <li>
                    <a href="#">#Кухня</a>
                  </li>
                  <li>
                    <a href="#">#Мнения</a>
                  </li>
                </ul>
              </div>
            </div>
            <div class="blog-list__author-item">
              <a href="#" class="blog-list__author-title">
                Абдураимова Санобар
              </a>
              <p class="blog-list__author-notecount">Количество записей: <span>5</span></p>
              <div class="blog-list__author-categories-wrapper">
                <span>Категории:</span>
                <ul class="blog-list__author-categories">
                  <li>
                    <a href="#">#Интервью</a>
                  </li>
                  <li>
                    <a href="#">#Места</a>
                  </li>
                  <li>
                    <a href="#">#Кухня</a>
                  </li>
                  <li>
                    <a href="#">#Мнения</a>
                  </li>
                </ul>
              </div>
            </div>
            <div class="blog-list__author-item">
              <a href="#" class="blog-list__author-title">
                Абдураимова Санобар
              </a>
              <p class="blog-list__author-notecount">Количество записей: <span>5</span></p>
              <div class="blog-list__author-categories-wrapper">
                <span>Категории:</span>
                <ul class="blog-list__author-categories">
                  <li>
                    <a href="#">#Интервью</a>
                  </li>
                  <li>
                    <a href="#">#Места</a>
                  </li>
                  <li>
                    <a href="#">#Кухня</a>
                  </li>
                  <li>
                    <a href="#">#Мнения</a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div class="load-more">
            <a href="#">Загрузить еще</a>
          </div>
        </div>
      </div>

      <div class="blog-list__items">
          <div class="blog-list__item">
              <div class="blog-list__item-img" style="background-image: url('/images/blog-item-1.jpg');"></div>
              <div class="blog-list__item-content">
                  <div class="blog-list__info">
                      <div class="blog-list__date">
                          Дата публикации: <span>03.11.20</span>
                      </div>
                      <div class="blog-list__tag">
                          #Туризм
                      </div>
                  </div>
                  <a href="#" class="blog-list__text">
                      Будет ли анимация в отелях, как работают аквапарки: ответы на самые главные вопросы.
                  </a>
                  <div class="blog-list__info">
                      <div class="blog-list__author">
                          Никита Синьков
                      </div>
                      <div class="blog-list__views">
                          12 532
                      </div>
                  </div>
              </div>
          </div>
          <div class="blog-list__item">
              <div class="blog-list__item-img" style="background-image: url('/images/blog-item-1.jpg');"></div>
              <div class="blog-list__item-content">
                  <div class="blog-list__info">
                      <div class="blog-list__date">
                          Дата публикации: <span>03.11.20</span>
                      </div>
                      <div class="blog-list__tag">
                          #Туризм
                      </div>
                  </div>
                  <a href="#" class="blog-list__text">
                      Будет ли анимация в отелях, как работают аквапарки: ответы на самые главные вопросы.
                  </a>
                  <div class="blog-list__info">
                      <div class="blog-list__author">
                          Никита Синьков
                      </div>
                      <div class="blog-list__views">
                          12 532
                      </div>
                  </div>
              </div>
          </div>
          <div class="blog-list__item">
              <div class="blog-list__item-img" style="background-image: url('/images/blog-item-1.jpg');"></div>
              <div class="blog-list__item-content">
                  <div class="blog-list__info">
                      <div class="blog-list__date">
                          Дата публикации: <span>03.11.20</span>
                      </div>
                      <div class="blog-list__tag">
                          #Туризм
                      </div>
                  </div>
                  <a href="#" class="blog-list__text">
                      Будет ли анимация в отелях, как работают аквапарки: ответы на самые главные вопросы.
                  </a>
                  <div class="blog-list__info">
                      <div class="blog-list__author">
                          Никита Синьков
                      </div>
                      <div class="blog-list__views">
                          12 532
                      </div>
                  </div>
              </div>
          </div>
          <div class="blog-list__item">
              <div class="blog-list__item-img" style="background-image: url('/images/blog-item-1.jpg');"></div>
              <div class="blog-list__item-content">
                  <div class="blog-list__info">
                      <div class="blog-list__date">
                          Дата публикации: <span>03.11.20</span>
                      </div>
                      <div class="blog-list__tag">
                          #Туризм
                      </div>
                  </div>
                  <a href="#" class="blog-list__text">
                      Будет ли анимация в отелях, как работают аквапарки: ответы на самые главные вопросы.
                  </a>
                  <div class="blog-list__info">
                      <div class="blog-list__author">
                          Никита Синьков
                      </div>
                      <div class="blog-list__views">
                          12 532
                      </div>
                  </div>
              </div>
          </div>
          <div class="blog-list__item">
              <div class="blog-list__item-img" style="background-image: url('/images/blog-item-1.jpg');"></div>
              <div class="blog-list__item-content">
                  <div class="blog-list__info">
                      <div class="blog-list__date">
                          Дата публикации: <span>03.11.20</span>
                      </div>
                      <div class="blog-list__tag">
                          #Туризм
                      </div>
                  </div>
                  <a href="#" class="blog-list__text">
                      Будет ли анимация в отелях, как работают аквапарки: ответы на самые главные вопросы.
                  </a>
                  <div class="blog-list__info">
                      <div class="blog-list__author">
                          Никита Синьков
                      </div>
                      <div class="blog-list__views">
                          12 532
                      </div>
                  </div>
              </div>
          </div>
          <div class="blog-list__item">
              <div class="blog-list__item-img" style="background-image: url('/images/blog-item-1.jpg');"></div>
              <div class="blog-list__item-content">
                  <div class="blog-list__info">
                      <div class="blog-list__date">
                          Дата публикации: <span>03.11.20</span>
                      </div>
                      <div class="blog-list__tag">
                          #Туризм
                      </div>
                  </div>
                  <a href="#" class="blog-list__text">
                      Будет ли анимация в отелях, как работают аквапарки: ответы на самые главные вопросы.
                  </a>
                  <div class="blog-list__info">
                      <div class="blog-list__author">
                          Никита Синьков
                      </div>
                      <div class="blog-list__views">
                          12 532
                      </div>
                  </div>
              </div>
          </div>
      </div>
      <div class="load-more">
          <a href="#">Загрузить еще</a>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: "index"
}
</script>

<style scoped>

</style>
