// =====================================================================
// پنجره‌ی «مشاور ارشد»: تبدیل تحلیل موتور (SG.Advisor) به توصیه‌ی فارسی
// ---------------------------------------------------------------------
// مشاور فقط مشورت می‌دهد و هیچ کاری را خودش انجام نمی‌دهد.
// متن‌ها کلی‌اند و اسم کشورها/عددها از تحلیل جایگذاری می‌شوند؛
// پس برای هر کشوری درست کار می‌کند.
// =====================================================================
(function (SG) {
  'use strict';
  const F = SG.Fmt, E = SG.Engine;

  // راه جبران کمبود هر شاخه‌ی نظامی
  const BRANCH_FIX = {
    land: 'پیاده و زرهی بیشتر بساز. زرهی را تنها نفرست: در برابر پهپاد ضعیف است، پس با پدافند همراهش کن.',
    air: 'جنگنده گران است. اگر بودجه نداری، با پدافند هوایی جلوی برتری هوایی دشمن را بگیر؛ برتری هوایی کل نبرد زمینی را عوض می‌کند.',
    navy: 'ناو و زیردریایی گران‌اند؛ ارزان‌تر این است که با موشک کروز ضدکشتی و پهپاد، دریا را برای دشمن ناامن کنی.',
    missile: 'موشک بالستیک و کروز بازدارندگی می‌دهد (دشمن می‌داند جواب می‌گیرد)، ولی ساختنش تنش با بقیه را بالا می‌برد.',
    airDefense: 'پدافند هوایی ارزان‌ترین جواب به جنگنده، بمب‌افکن و موشک دشمن است.',
    cyber: 'واحد سایبری ارزان است و ارتباطات و پدافند دشمن را قبل از حمله مختل می‌کند.',
    drone: 'پهپاد ارزان است و زرهی دشمن را شکار می‌کند؛ برای کشور کم‌بودجه بهترین سرمایه‌گذاری است.',
  };

  const STRATEGY = {
    hegemon: {
      title: 'حفظ برتری (ابرقدرت)',
      desc: 'تو الان در صدر هستی. خطر اصلی، خود قدرتت است: اگر زیادی تهاجمی شوی، بقیه از ترس علیه تو متحد می‌شوند. هزینه‌ی نگهداری ارتش بزرگ و «خستگی جنگ» هم بودجه و ثبات را می‌خورد.',
      steps: a => [
        'اقتصاد و فناوری را جلو نگه دار تا فاصله‌ات با رقبا کم نشود؛ ابرقدرت با پول ابرقدرت می‌ماند.',
        'متحدانت را راضی نگه دار (تجارت، کمک، دفاع از آن‌ها). ائتلافت بزرگ‌ترین سلاح توست.',
        'جنگ طولانی نکن: یا سریع برنده شو یا مذاکره کن. جنگ فرسایشی حتی ابرقدرت را از درون می‌خورد.',
        a.threat ? `رقیب اصلی (${name(a.threat)}) را با تحریم و ائتلاف مهار کن، نه با جنگ مستقیم.` : 'نگذار هیچ رقیبی به تو نزدیک شود.',
      ],
    },
    economy: {
      title: 'اول اقتصاد',
      desc: 'پول همه چیز را می‌خرد: ارتش، نفوذ و رضایت مردم. با تهدید فعلی‌ات وقت داری اول ثروتمند شوی.',
      steps: () => [
        'با شرکای بزرگ رابطه و تجارت را بالا ببر؛ تجارت هم درآمد می‌دهد هم دوست.',
        'در درخت پیشرفت، شاخه‌ی اقتصاد را اول باز کن.',
        'ارتش را در حد بازدارندگی نگه دار، نه بیشتر؛ هزینه‌ی نگهداری ارتش بزرگ رشد را می‌کشد.',
        'وقتی GDP بالا رفت، ارتش مدرن بساز؛ آن موقع ارزان‌تر تمام می‌شود.',
      ],
    },
    deterrence: {
      title: 'بازدارندگی نامتقارن',
      desc: 'دشمنت از تو قوی‌تر است، پس رودررو با او نجنگ. هزینه‌ی حمله به خودت را آن‌قدر بالا ببر که کسی جرئتش را نکند، و در این فاصله اقتصاد را نجات بده.',
      steps: a => [
        `روی نقطه‌ی قوتت سرمایه بگذار: ${a.best.map(b => F.BRANCH[b]).join(' و ')}.`,
        'پدافند هوایی بساز تا برتری هوایی دشمن خنثی شود.',
        a.negotiable.length
          ? `تحریم را با مذاکره کم کن؛ از ${a.negotiable.map(name).join('، ')} شروع کن که رابطه‌ی قابل‌ترمیم دارند.`
          : 'با کشورهای بی‌طرف تجارت کن تا اثر تحریم کم شود.',
        'ثبات داخلی را نگه دار؛ کشور ناآرام قبل از دشمن، از درون فرو می‌ریزد.',
      ],
    },
    coalition: {
      title: 'ائتلاف‌سازی',
      desc: 'تو پیمان نظامی نداری و تنها هستی. اگر حمله شوی کسی به کمکت نمی‌آید. اول دوست پیدا کن.',
      steps: a => [
        a.candidates.length
          ? `بهترین گزینه‌های اتحاد: ${a.candidates.map(x => name(x.id) + (x.sharedEnemy ? ' (دشمن مشترک داریم)' : '')).join('، ')}.`
          : 'رابطه با همسایه‌های بی‌طرف را بالا ببر تا گزینه‌ی اتحاد پیدا شود.',
        'با تجارت و کمک، رابطه را بالای ۶۰ ببر؛ بعد پیشنهاد اتحاد بده.',
        'تا وقتی متحد نداری، به کسی حمله نکن.',
        'پدافند و ارتش زمینی را برای دفاع از خاک خودت تقویت کن.',
      ],
    },
    expansion: {
      title: 'گسترش منطقه‌ای',
      desc: 'همسایه‌ی ضعیف داری و ارتشت آماده است. فتح، منابع (GDP، نفت، جمعیت) کشور مغلوب را به تو می‌دهد. ولی حمله‌ی بی‌بهانه تحریم و ائتلاف علیه تو می‌آورد.',
      steps: a => [
        'اول بهانه‌ی موجه بساز (تنش مرزی، دفاع از متحد). حمله بدون بهانه = تحریم و انزوا.',
        'قبل از حمله خط تدارکات (سوخت و مهمات) را آماده کن؛ ارتش بی‌تدارکات سریع ضعیف می‌شود.',
        `فقط به هدفی حمله کن که متحد قوی ندارد${a.targets.filter(t => !t.risky).length ? ' — مثل ' + a.targets.filter(t => !t.risky).map(t => name(t.id)).join('، ') : ''}.`,
        'بعد از فتح، ناآرامی منطقه‌ی تصرف‌شده را مدیریت کن تا منابعش کامل به تو برسد.',
      ],
    },
  };

  let state = null;
  const name = id => (state && state.countries[id] ? state.countries[id].name : id);
  const chip = id => `<button class="chip" data-goto="${id}">${F.esc(name(id))}</button>`;

  function item(cls, icon, title, text) {
    return `<div class="adv-item ${cls}"><div class="adv-icon">${icon}</div>
      <div><b>${title}</b><p>${text}</p></div></div>`;
  }

  function render(s, id) {
    state = s;
    const a = SG.Advisor.analyze(s, id);
    const c = s.countries[id];
    const st = STRATEGY[a.strategy];
    let html = '';

    html += `<p class="adv-intro">🧑‍💼 «قربان، گزارش من درباره‌ی <b>${F.esc(c.name)}</b>:
      اقتصاد رتبه‌ی ${F.num(a.econRank)} و ارتش رتبه‌ی ${F.num(a.milRank)} جهان است.»</p>`;

    // ---------- راهبرد ----------
    html += `<section class="card adv-strategy">
      <h3>🧭 راهبرد پیشنهادی: ${st.title}</h3>
      <p>${st.desc}</p>
      <ol>${st.steps(a).map(x => `<li>${x}</li>`).join('')}</ol>
    </section>`;

    // ---------- نقاط قوت ----------
    const strengths = [];
    if (a.energy.ratio >= 1.2) strengths.push(item('good', '🛢️', 'انرژی مازاد',
      `${F.num(Math.round(a.energy.surplus))} واحد بیشتر از نیازت تولید می‌کنی. نفت و گاز یعنی درآمد ارزی، سوخت ارتش در جنگ، و اهرم دیپلماسی (کشورهای واردکننده به تو نیاز دارند).`));
    if (a.flags.bigEconomy) strengths.push(item('good', '💰', 'اقتصاد بزرگ',
      'بودجه‌ی زیاد یعنی ارتش بزرگ‌تر، تحقیق سریع‌تر و توان تحمل جنگ طولانی‌تر.'));
    if (a.flags.nuclear) strengths.push(item('good', '☢️', 'بازدارندگی هسته‌ای',
      'کسی جرئت نمی‌کند به خاک اصلی‌ات حمله‌ی تمام‌عیار کند.'));
    for (const e of a.edges) strengths.push(item('good', '▲', `برتری ${F.BRANCH[e.branch]}`,
      `${F.num(e.mine)} در برابر ${F.num(e.theirs)} تهدید اصلی‌ات. این برگ برنده‌ی توست.`));
    if (a.allies.length) strengths.push(item('good', '🤝', 'متحدان نظامی',
      `${F.num(a.allies.length)} کشور با تو پیمان دفاعی دارند؛ اگر حمله شوی ممکن است کمکت کنند.`));
    if (strengths.length) html += `<section class="card"><h3>✅ نقاط قوت</h3>${strengths.join('')}</section>`;

    // ---------- کمبودها و راه جبران ----------
    const weak = [];
    for (const g of a.gaps) weak.push(item('bad', '▼', `ضعف ${F.BRANCH[g.branch]} (${F.num(g.mine)} در برابر ${F.num(g.theirs)})`,
      BRANCH_FIX[g.branch]));
    if (a.energy.ratio < 0.7) weak.push(item('bad', '⛽', 'وابستگی به واردات انرژی',
      'در جنگ یا تحریم، قطع واردات انرژی ارتش و اقتصاد را فلج می‌کند. با کشورهای صادرکننده‌ی انرژی رابطه بساز، یا منطقه‌ی نفت‌خیز به دست بیاور.'));
    if (a.sanctionedBy.length >= 3) weak.push(item('bad', '🚫', `تحریم توسط ${F.num(a.sanctionedBy.length)} کشور`,
      'تحریم درآمد و دسترسی به فناوری را کم می‌کند. با مذاکره، کاهش تنش و تجارت با کشورهای بی‌طرف اثرش را کم کن.'));
    if (a.flags.lowStability) weak.push(item('bad', '🔥', 'ثبات داخلی پایین',
      'خطر اعتراض و شورش. هزینه‌ی رفاهی بده، جنگ بی‌دلیل راه نینداز (جنگ نارضایتی می‌آورد).'));
    if (!a.allies.length) weak.push(item('bad', '🛡️', 'بدون پیمان نظامی',
      'اگر حمله شوی تنها هستی. پایین‌تر، گزینه‌های اتحاد را ببین.'));
    if (a.flags.poor) weak.push(item('bad', '📉', 'درآمد سرانه‌ی پایین',
      'مالیات کم یعنی بودجه‌ی کم. قبل از ارتش گران، روی رشد اقتصاد تمرکز کن.'));
    if (a.flags.atWar.length) weak.push(item('bad', '⚔️', 'درگیر جنگ',
      `با ${a.flags.atWar.map(name).join('، ')} در جنگی. هر ماه جنگ، خستگی جنگ و هزینه بالا می‌رود: پیروز شو یا مذاکره کن.`));
    if (weak.length) html += `<section class="card"><h3>⚠️ کمبودها و راه جبران</h3>${weak.join('')}</section>`;

    // ---------- تهدید ----------
    if (a.threat) {
      const t = s.countries[a.threat];
      html += `<section class="card"><h3>🎯 بزرگ‌ترین تهدید</h3>
        <p>${chip(a.threat)} قدرت نظامی ${F.num(E.militaryPower(t))} در برابر ${F.num(a.power)} ما،
        رابطه ${F.num(E.getRelation(s, id, a.threat))}.
        ${E.militaryPower(t) > a.power ? 'از ما قوی‌تر است؛ رودررو با او نجنگ.' : 'از ما ضعیف‌تر است ولی متحدانش را دست کم نگیر.'}</p>
      </section>`;
    }

    // ---------- فرصت‌ها ----------
    let opp = '';
    if (a.candidates.length) {
      opp += `<div class="row-label">گزینه‌های اتحاد</div><div class="chips">${a.candidates.map(x => chip(x.id)).join('')}</div>`;
    }
    if (a.targets.length) {
      opp += `<div class="row-label">همسایه‌های ضعیف‌تر و غیردوست</div>`;
      opp += a.targets.map(t => `<p>${chip(t.id)} قدرت ${F.num(t.power)}${t.energyRich ? ' | 🛢️ نفت‌خیز' : ''}
        — ${t.risky ? `<span class="bad">خطرناک: متحدان قوی دارد (${t.defenders.map(name).join('، ')})</span>`
          : t.defenders.length ? `متحدانش: ${t.defenders.map(name).join('، ')}` : '<span class="good">متحد نظامی ندارد</span>'}</p>`).join('');
    }
    if (opp) html += `<section class="card"><h3>🔍 فرصت‌ها</h3>${opp}</section>`;

    html += `<p class="muted small">مشاور فقط مشورت می‌دهد؛ تصمیم با شماست. با تغییر اوضاع، توصیه‌ها هم عوض می‌شوند.</p>`;
    return html;
  }

  // ===================================================================
  // مشاور اقتصادی
  // ===================================================================
  const FACTOR_TEXT = {
    welfare: ['رفاه و خدمات', 'نسبت به اول بازی'],
    tax: ['مالیات', 'نسبت به اول بازی'],
    inflation: ['تورم', 'گرانی، مردم را ناراضی می‌کند'],
    growth: ['رشد اقتصادی', 'رونق یا رکود'],
    temporary: ['اثر فرمان‌های اخیر', 'بسته‌ی حمایتی، سرکوب، ریاضت و ...'],
  };

  const signedMoney = v => (v >= 0 ? '+' : '−') + F.money(Math.abs(v));
  const signed = (v, d = 1) => (v >= 0 ? '+' : '−') + F.num(Math.round(Math.abs(v) * 10 ** d) / 10 ** d);

  /** خلاصه‌ی اثر یک پیشنهاد: تراز ماهانه | ثبات | رشد */
  function effectLine(ef) {
    const parts = [];
    if (Math.abs(ef.monthly) >= 0.005) parts.push(`<span class="${ef.monthly >= 0 ? 'good' : 'bad'}">بودجه ${signedMoney(ef.monthly)}/ماه</span>`);
    if (Math.abs(ef.target) >= 0.1) parts.push(`<span class="${ef.target >= 0 ? 'good' : 'bad'}">ثبات ${signed(ef.target)}</span>`);
    if (Math.abs(ef.growth) >= 0.05) parts.push(`<span class="${ef.growth >= 0 ? 'good' : 'bad'}">رشد ${signed(ef.growth)}٪</span>`);
    return parts.join(' | ') || '<span class="muted">اثر ناچیز</span>';
  }

  function policyBtn(o, label) {
    return `<div class="rx"><div><b>${label}</b><div class="small">${effectLine(o.effect)}</div></div>
      <button class="btn tiny" data-apply="${o.key}">اعمال</button></div>`;
  }

  function decreeBtn(a, key, note) {
    const st = a.decrees[key], t = window.SG_DATA.decrees[key];
    const why = st.ready ? (st.cost > 0 ? 'هزینه: ' + F.money(st.cost) : 'رایگان')
      : st.reason === 'cooldown' ? `${F.num(st.waitTurns)} ماه دیگر آماده می‌شود` : window.SG_DATA.decreeReasons[st.reason];
    return `<div class="rx"><div><b>${t.icon} فرمان «${t.name}»</b><div class="small muted">${note} | ${why}</div></div>
      <button class="btn tiny" data-decree="${key}" ${st.ready ? '' : 'disabled'}>اجرا</button></div>`;
  }

  function renderEconomy(s, id) {
    state = s;
    const a = SG.EconAdvisor.analyze(s, id);
    const c = s.countries[id], e = c.eco, b = a.budget, o = a.options;
    const statusTxt = { ok: ['🟢', 'وضع اقتصاد قابل قبول است'], warning: ['🟠', 'اقتصاد زیر فشار است'], crisis: ['🔴', 'اقتصاد در بحران است'] }[a.status];
    let html = `<p class="adv-intro">💼 «قربان، ${statusTxt[0]} ${statusTxt[1]}.
      تورم ${F.num(Math.round(e.inflation * 10) / 10)}٪، رشد ${F.num(Math.round(e.growth * 1000) / 10)}٪،
      تراز ماهانه ${signedMoney(b.monthly)}، ثبات ${F.num(Math.round(c.stability))} (به سمت ${F.num(Math.round(a.target))}).»</p>`;

    // ---------- چرا مردم راضی/ناراضی‌اند ----------
    if (a.stabilityFactors.length) {
      html += `<section class="card"><h3>⚖️ چه چیزی روی رضایت مردم اثر دارد؟</h3>
        ${a.stabilityFactors.map(f => {
          const w = Math.min(100, Math.abs(f.value) * 4);
          return `<div class="factor"><span>${FACTOR_TEXT[f.key][0]} <small class="muted">${FACTOR_TEXT[f.key][1]}</small></span>
            <div class="fbar ${f.value >= 0 ? 'pos' : 'neg'}"><span style="width:${w}%"></span></div>
            <b class="${f.value >= 0 ? 'good' : 'bad'}">${signed(f.value)}</b></div>`;
        }).join('')}
        <p class="muted small">عددها یعنی هر عامل چند امتیاز «ثبات هدف» را بالا یا پایین برده؛ ثبات هر ماه کم‌کم به سمت هدف می‌رود.</p>
      </section>`;
    }

    if (!a.problems.length) {
      html += `<section class="card"><h3>✅ مشکل جدی نیست</h3>
        <p>فرصت خوبی برای رشد بلندمدت است:</p>${policyBtn(o.investUp, '📈 سرمایه‌گذاری +۲٪ GDP')}
        ${decreeBtn(a, 'infrastructure', 'رشد اقتصادی ۱۸ ماه بیشتر')}</section>`;
    }

    for (const p of a.problems) {
      const sev = ['🔴', '🟠', '🟡'][3 - p.severity] || '🟡';
      if (p.key === 'inflation') {
        const causes = [];
        if (a.inflationCauses.includes('printing')) causes.push('در ماه‌های اخیر <b>پول چاپ شده</b>؛ تا وقتی کسری بودجه با چاپ پول جبران شود، تورم پایین نمی‌آید.');
        if (a.inflationCauses.includes('deficit_no_credit')) causes.push(`بودجه کسری دارد و <b>کسی به ما وام نمی‌دهد</b>${b.pressure >= 0.3 ? ' (به‌خاطر تحریم)' : ' (بدهی زیاد است)'}؛ پس خزانه که خالی شود، پول چاپ می‌شود.`);
        if (a.inflationCauses.includes('structural')) causes.push(`تورم «ساختاری» این کشور بالاست (حدود ${F.num(Math.round(e.baseInflation))}٪)؛ فقط با بودجه‌ی مازاد یا ریاضت آرام پایین می‌آید.`);
        if (a.inflationCauses.includes('converging_down')) causes.push('تورم در حال پایین آمدن به سمت سطح ساختاری است. 👍');
        if (a.inflationCauses.includes('austerity_working')) causes.push('برنامه‌ی ریاضت در حال اثر گذاشتن است. 👍');
        html += `<section class="card rx-card"><h3>${sev} تورم ${F.num(Math.round(e.inflation))}٪ — چه کنیم؟</h3>
          <div class="row-label">علت</div><ul>${causes.map(x => `<li>${x}</li>`).join('') || '<li>تورم وارداتی و انتظارات.</li>'}</ul>
          <div class="row-label">راه‌حل</div>
          ${b.monthly < 0 ? `<p class="small">اول باید <b>کسری بودجه</b> بسته شود (${signedMoney(b.monthly)} در ماه):</p>` : ''}
          ${b.monthly < 0 ? policyBtn(o.welfareDown, '✂️ رفاه −۲٪ GDP') : ''}
          ${b.monthly < 0 ? policyBtn(o.taxUp, '💰 مالیات +۳٪') : ''}
          ${o.lineOff && b.monthly < 0 ? policyBtn(o.lineOff, `🏭 خاموش کردن خط ${window.SG_DATA.units[o.lineOff.unit].factory.name}`) : ''}
          ${decreeBtn(a, 'austerity', 'تورم ساختاری را ۶ ماه پایین می‌آورد؛ ولی رضایت و رشد کم می‌شود')}
          ${a.canBorrow ? decreeBtn(a, 'foreign_loan', 'به‌جای چاپ پول، کسری را با وام بپوشان') : '<p class="small muted">وام خارجی در دسترس نیست؛ چاپ پول را با بستن کسری متوقف کنید.</p>'}
          <p class="small muted">⚠️ هر دو راه (ریاضت و افزایش مالیات) کوتاه‌مدت نارضایتی می‌آورند؛ اگر ثبات پایین است، هم‌زمان «بسته‌ی حمایتی» را در نظر بگیرید.</p>
        </section>`;
      } else if (p.key === 'unrest') {
        const worst = a.stabilityFactors.filter(f => f.value < 0).slice(0, 2).map(f => FACTOR_TEXT[f.key][0]);
        html += `<section class="card rx-card"><h3>${sev} نارضایتی مردم (ثبات ${F.num(Math.round(c.stability))}) — چه کنیم؟</h3>
          <div class="row-label">علت</div>
          <p class="small">${worst.length ? `بیشترین فشار از طرف <b>${worst.join(' و ')}</b> است (نمودار بالا).` : 'عامل منفی بزرگی دیده نمی‌شود؛ ثبات پایه‌ی این کشور پایین است.'}
            ${c.stability < 25 ? '<b class="bad">خطر شورش و کودتا؛ اگر ۳ ماه زیر ۵ بماند دولت سقوط می‌کند.</b>' : ''}</p>
          <div class="row-label">راه‌حل فوری</div>
          ${decreeBtn(a, 'welfare_package', 'ثبات ۶ ماه بالا می‌رود')}
          ${decreeBtn(a, 'crackdown', a.democracy ? 'فوری ولی در دموکراسی بعدش نارضایتی خیلی بیشتر می‌شود' : 'فوری و ارزان، ولی بعدش واکنش منفی دارد')}
          <div class="row-label">راه‌حل پایدار</div>
          ${policyBtn(o.welfareUp, '🎁 رفاه +۲٪ GDP')}
          ${policyBtn(o.taxDown, '💸 مالیات −۳٪')}
          ${decreeBtn(a, 'anti_corruption', 'مالیات بهتر جمع می‌شود و مردم کمی راضی‌تر')}
          ${e.inflation > 15 ? '<p class="small">💡 تورم بالا ریشه‌ی نارضایتی است؛ بخش تورم را هم ببینید.</p>' : ''}
          <p class="small muted">⚠️ رفاه بیشتر و مالیات کمتر، بودجه را منفی‌تر می‌کند؛ اگر وام ندارید، به چاپ پول و تورم می‌رسد.</p>
        </section>`;
      } else if (p.key === 'deficit') {
        html += `<section class="card rx-card"><h3>${sev} کسری بودجه ${signedMoney(b.monthly)} در ماه</h3>
          <p class="small">${a.months === Infinity ? '' : `خزانه حدود ${F.num(Math.floor(a.months))} ماه دیگر خالی می‌شود؛ بعد ${a.canBorrow ? 'قرض می‌گیریم (بدهی و بهره بالا می‌رود)' : '<b>پول چاپ می‌شود (تورم)</b>'}.`}</p>
          ${o.lineOff ? policyBtn(o.lineOff, `🏭 خاموش کردن خط ${window.SG_DATA.units[o.lineOff.unit].factory.name} (گران‌ترین خط تولید)`) : ''}
          ${policyBtn(o.taxUp, '💰 مالیات +۳٪')}
          ${policyBtn(o.welfareDown, '✂️ رفاه −۲٪ GDP')}
          ${decreeBtn(a, 'anti_corruption', 'درآمد مالیاتی بیشتر بدون افزایش نرخ')}
          ${a.canBorrow ? decreeBtn(a, 'foreign_loan', 'پول نقد فوری؛ بدهی بیشتر') : ''}
        </section>`;
      } else if (p.key === 'debt') {
        html += `<section class="card rx-card"><h3>${sev} بدهی ${F.num(Math.round(a.debtRatio * 100))}٪ GDP</h3>
          <p class="small">بهره‌ی بدهی ماهانه ${F.money(b.interest / 12)} است (نرخ ${F.num(Math.round(b.rate * 1000) / 10)}٪). با بدهی بیشتر، نرخ بهره و خطر بسته شدن راه وام بالا می‌رود.
            راه‌حل: بودجه را مازاد کنید (مالیات بیشتر یا هزینه‌ی کمتر). رشد اقتصادی هم نسبت بدهی را کم می‌کند.</p>
          ${policyBtn(o.taxUp, '💰 مالیات +۳٪')}
        </section>`;
      } else if (p.key === 'growth') {
        html += `<section class="card rx-card"><h3>${sev} رشد کم (${F.num(Math.round(e.growth * 1000) / 10)}٪)</h3>
          <p class="small">${b.pressure >= 0.3 ? 'تحریم بزرگ‌ترین ترمز رشد است. ' : ''}${e.inflation > 15 ? 'تورم بالا رشد را کند می‌کند. ' : ''}${e.taxRate > 0.3 ? 'مالیات بالا رشد را کم کرده. ' : ''}${c.stability < 50 ? 'بی‌ثباتی سرمایه را فراری می‌دهد. ' : ''}</p>
          ${policyBtn(o.investUp, '📈 سرمایه‌گذاری +۲٪ GDP')}
          ${decreeBtn(a, 'infrastructure', 'رشد اقتصادی ۱۸ ماه بیشتر')}
        </section>`;
      } else if (p.key === 'sanctions') {
        html += `<section class="card rx-card"><h3>${sev} تحریم (فشار ${F.num(Math.round(b.pressure * 100))}٪)</h3>
          <p class="small">تحریم درآمد نفت را کم می‌کند، راه وام را می‌بندد و تجهیزات پیشرفته را گران می‌کند.
            تا دیپلماسی (مرحله‌ی ۵) فعال شود: کسری بودجه نداشته باشید چون تنها راه جبرانش چاپ پول است؛
            ${a.exporter ? 'صادرات انرژی هنوز مهم‌ترین منبع ارز شماست.' : 'وابستگی به واردات انرژی را کم کنید.'}</p>
        </section>`;
      } else if (p.key === 'energy') {
        html += `<section class="card rx-card"><h3>${sev} هزینه‌ی سنگین واردات انرژی</h3>
          <p class="small">ماهانه ${F.money(b.energyImport / 12)} برای انرژی می‌پردازیم. وقتی قیمت جهانی بالا می‌رود، بودجه آسیب می‌بیند.
            نیروهای نظامی هم سوخت مصرف می‌کنند؛ جابه‌جایی‌های غیرضروری را کم کنید.</p>
        </section>`;
      }
    }
    html += `<p class="muted small">عددهای «اثر» برای همین کشور و همین لحظه محاسبه شده‌اند و از نوبت بعد اعمال می‌شوند.</p>`;
    return html;
  }

  // ===================================================================
  // پنجره با دو زبانه: راهبرد کلی | مشاور اقتصادی
  // ===================================================================
  let tab = 'strategy', ctxOpen = null;

  function body() {
    const { s, id } = ctxOpen;
    const isPlayer = id === s.playerId && s.countries[id].eco;
    const tabs = isPlayer ? `<div class="seg mil-tabs">
        <button class="${tab === 'strategy' ? 'on' : ''}" data-tab="strategy">🧭 راهبرد کلی</button>
        <button class="${tab === 'economy' ? 'on' : ''}" data-tab="economy">💼 مشاور اقتصادی</button></div>` : '';
    return tabs + (isPlayer && tab === 'economy' ? renderEconomy(s, id) : render(s, id));
  }

  function rerender() {
    const el = document.querySelector('.modal-body');
    if (!el) return;
    const top = el.scrollTop;
    el.innerHTML = body();
    el.scrollTop = top;
  }

  /**
   * باز کردن پنجره‌ی مشاور
   * @param {string} [startTab] 'strategy' | 'economy'
   * @param {()=>void} [onChange] بعد از اعمال پیشنهاد (برای به‌روز کردن نوار منابع)
   */
  function open(s, id, onGoto, startTab, onChange) {
    ctxOpen = { s, id, onGoto, onChange: onChange || (() => {}) };
    if (startTab) tab = startTab;
    else if (id !== s.playerId) tab = 'strategy';
    SG.Modal.open({
      title: (tab === 'economy' ? 'مشاور اقتصادی — ' : 'مشاور ارشد — ') + s.countries[id].name,
      html: body(),
      onClick: e => {
        const t = e.target.closest('[data-tab]');
        if (t) { tab = t.dataset.tab; rerender(); document.querySelector('.modal-head h2').textContent = (tab === 'economy' ? 'مشاور اقتصادی — ' : 'مشاور ارشد — ') + s.countries[id].name; return; }
        const ap = e.target.closest('[data-apply]');
        if (ap) {
          const o = SG.EconAdvisor.analyze(s, id).options[ap.dataset.apply];
          if (o.key === 'lineOff') SG.Military.setLine(s, id, o.unit, false);
          else for (const [k, v] of Object.entries(o.changes)) SG.Actions.setPolicy(s, id, k, v);
          SG.NotifyUI.simpleToast('✅ پیشنهاد مشاور اعمال شد (از نوبت بعد اثر می‌کند).', 'lvl-info');
          ctxOpen.onChange(); rerender(); return;
        }
        const dc = e.target.closest('[data-decree]');
        if (dc) {
          const r = SG.Government.runDecree(s, id, dc.dataset.decree);
          SG.NotifyUI.simpleToast(r.text, r.ok ? 'lvl-info' : 'lvl-warning');
          ctxOpen.onChange(); rerender(); return;
        }
        const b = e.target.closest('[data-goto]');
        if (b) { SG.Modal.close(); onGoto(b.dataset.goto); }
      },
    });
  }

  SG.AdvisorPanel = { open, render, renderEconomy };
})(window.SG = window.SG || {});
