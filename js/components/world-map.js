/* ==== COMPONENT: WORLD MAP ==== */
export function worldMap() {
  return `
    <div class="map-wrap">
      <svg class="world-map" viewBox="0 0 1100 620" xmlns="http://www.w3.org/2000/svg"
           aria-label="Карта мира Эйры">

        <!-- ==== ПАРЯЩИЕ ОСТРОВА (правее) ==== -->
        <g class="world-map__region world-map__region--heavenly"
           data-region="heavenly"
           data-title="Парящие Острова"
           data-desc="Магия, знания, Хранитель. Финальная локация, куда попадают лишь в конце пути.">
          <ellipse cx="960" cy="160" rx="115" ry="60"/>
          <text class="world-map__label" x="960" y="166" text-anchor="middle">Парящие</text>
        </g>

        <!-- ============================================ -->
        <!-- ИМИРДАЛ (горы) — левый верх                   -->
        <!-- Право: X=400, Низ: Y=320                      -->
        <!-- ============================================ -->
        <g class="world-map__region world-map__region--imirdal"
           data-region="imirdal"
           data-title="Громовой Имирдал"
           data-desc="Ледяные горы великанов. Вечные льды, громо-звери, портал на Парящие Острова.">
          <path d="M 400 130
                   L 400 320
                   L 220 320
                   Q 160 320 130 290
                   Q 100 260 100 220
                   Q 100 160 140 130
                   Q 180 100 240 100
                   Q 340 100 400 130 Z"/>
          <text class="world-map__label" x="250" y="225" text-anchor="middle">Имирдал</text>
        </g>

        <!-- ============================================ -->
        <!-- СОЛНЕЧНЫЕ (равнины) — правый верх             -->
        <!-- Лево: X=400, Низ: Y=320                       -->
        <!-- ============================================ -->
        <g class="world-map__region world-map__region--eldarhalm"
           data-region="eldarhalm"
           data-title="Солнечные Земли"
           data-desc="Империя людей. Равнины, торговые пути, крепости. Сейчас на грани войны.">
          <path d="M 400 130
                   Q 460 100 560 100
                   Q 660 100 720 130
                   Q 800 170 800 240
                   Q 800 290 770 320
                   L 600 320
                   L 400 320
                   Z"/>
          <text class="world-map__label" x="600" y="215" text-anchor="middle">Солнечные</text>
        </g>

        <!-- ============================================ -->
        <!-- ЛЕС (Аэнордал) — центр, с волнистыми краями   -->
        <!-- Верх: Y=320, Низ: Y=460, Право: X=600         -->
        <!-- ============================================ -->
        <g class="world-map__region world-map__region--aenordal"
           data-region="aenordal"
           data-title="Аэнордал"
           data-desc="Вечный лес эльфов. Древо Мудрости, священные рощи, тишина.">
          <path d="M 200 320
                   L 600 320
                   L 600 460
                   L 200 460
                   Q 160 460 150 420
                   Q 140 380 160 350
                   Q 180 330 200 320 Z"/>
          <text class="world-map__label" x="400" y="400" text-anchor="middle">Аэнордал</text>
        </g>

        <!-- ============================================ -->
        <!-- БОЛОТА — правый центр                         -->
        <!-- Лево: X=600, Верх: Y=320, Низ: Y=540          -->
        <!-- ============================================ -->
        <g class="world-map__region world-map__region--swamp"
           data-region="swamp"
           data-title="Болотная Империя"
           data-desc="Русалки, рыболюди, ящеролюди. Внутренние конфликты, пророчества, Зал Будущего.">
          <path d="M 600 320
                   L 720 320
                   Q 790 330 810 380
                   Q 830 430 820 490
                   Q 810 535 780 545
                   Q 720 560 660 550
                   Q 620 545 600 540
                   L 600 320 Z"/>
          <text class="world-map__label" x="710" y="435" text-anchor="middle">Болотная</text>
        </g>

        <!-- ============================================ -->
        <!-- ПУСТЫНЯ (Джаухар) — низ                       -->
        <!-- Верх: Y=460, Право: X=600                     -->
        <!-- ============================================ -->
        <g class="world-map__region world-map__region--jauhar"
           data-region="jauhar"
           data-title="Пустыня Джаухар"
           data-desc="Нейтральная земля изгоев. Джин Хаким-Кадир исчез. Здесь принимают всех.">
          <path d="M 180 460
                   L 600 460
                   L 600 540
                   Q 610 570 590 585
                   Q 540 600 440 600
                   Q 320 600 240 590
                   Q 170 580 155 545
                   Q 145 505 160 480
                   Q 170 468 180 460 Z"/>
          <text class="world-map__label" x="390" y="525" text-anchor="middle">Джаухар</text>
        </g>

      </svg>

      <div class="map-panel" id="mapPanel">
        <div class="map-panel__media img-slot img-slot--16x9" data-label="Выбери регион" id="mapPanelImg">
          <img src="" alt="" id="mapPanelImgEl">
        </div>
        <div>
          <div class="map-panel__label">Регион</div>
          <h3 class="map-panel__title" id="mapPanelTitle">Нажми на регион</h3>
          <p class="map-panel__desc" id="mapPanelDesc">Выбери любую империю на карте, чтобы увидеть краткое описание.</p>
          <a href="#" class="map-panel__cta" id="mapPanelCta" style="display:none;">Открыть регион</a>
        </div>
      </div>
    </div>
  `;
}