// Main app — renders the 10 step cards (00 prereq + 1..9) and mounts Tweaks panel.

const { useState, useEffect } = React;

const STEPS = [
  {
    n: "00",
    id: "step-0",
    eyebrow: "Step 00 · Prerequisites",
    title: "前置作業：把工具備齊",
    sub: "在開始之前，請確認手邊有以下三樣東西，少一樣都會卡住。",
    schKey: "Sch0",
    schCap: ["前置 · 三樣必備物品", "PRE / 0"],
    notes: () => (
      <>
        <p>整個流程在公司電腦上完成。讀卡機需要插在 USB，請先確認驅動程式已經安裝。</p>
        <ul>
          <li><strong>工商憑證</strong>：經濟部核發的 IC 卡，是進入查詢系統的主要鑰匙。</li>
          <li><strong>讀卡機</strong>：插 USB 用、讀 IC 卡那種。家裡報稅用的也可以。</li>
          <li><strong>電子信箱</strong>：用來收申辦完成的通知，建議用每天會看的那個。</li>
        </ul>
        <div className="callout">
          <strong>沒有工商憑證怎麼辦？</strong>
          可至經濟部「<a href="https://moeaca.nat.gov.tw" target="_blank" rel="noopener">工商憑證管理中心</a>」線上申請。
          行號（無工商憑證）可改用 <span className="pill">健保卡</span> 註冊登入。
        </div>
      </>
    ),
  },
  {
    n: "01",
    id: "step-1",
    eyebrow: "Step 01",
    title: "選擇查詢方式：所得查調申請 → 工商憑證",
    sub: "進入「財政部稅務入口網」線上查調頁，在表格中找到「所得查調申請」這一列，點選綠色的「工商憑證」按鈕。",
    schKey: "Sch1",
    schCap: ["線上查調 · 查詢方式表格", "01 / 9"],
    notes: () => (
      <>
        <p>網址：<a href="https://tax.nat.gov.tw" target="_blank" rel="noopener"><span style={{fontFamily:'var(--mono)'}}>tax.nat.gov.tw</span></a>。表格上方有「自行查詢 / 委託查詢」兩大區塊，認準<strong>「自行查詢」下的「所得查調申請」</strong>那一列。</p>
        <ul>
          <li>查詢所得期間：<strong>115年4月28日起至6月1日止</strong>。</li>
          <li>同一列右側會看到四種憑證選項，請選最左邊的<strong>「工商憑證」</strong>（綠色按鈕）。</li>
          <li>使用健保卡僅限獨資合夥組織，且 114/12/31 的負責人持有時才適用。</li>
        </ul>
      </>
    ),
  },
  {
    n: "02",
    id: "step-2",
    eyebrow: "Step 02",
    title: "工商憑證登入：填統編、PIN 與驗證碼",
    sub: "把工商憑證插入讀卡機，依序輸入營利事業統一編號、PIN 碼與圖形驗證碼，按下方「登入」。",
    schKey: "Sch2",
    schCap: ["工商憑證登入頁", "02 / 9"],
    notes: () => (
      <>
        <p>登入頁上有三個必填欄位（前面標有紅色 *）：</p>
        <ul>
          <li><strong>營利事業統一編號</strong>：填公司統編。</li>
          <li><strong>PIN 碼</strong>：當初領憑證時自設的密碼，<strong>不是統編</strong>。</li>
          <li><strong>圖形驗證碼</strong>：依右側顯示的英數字輸入（不分大小寫），看不清楚可按右邊的「重新整理」。</li>
        </ul>
        <div className="callout warn">
          <strong>常見狀況</strong>
          PIN 碼連續輸錯三次會鎖卡。讀卡機驅動沒裝、或缺 HiCOS 卡片管理工具，瀏覽器會無法讀取憑證。
        </div>
      </>
    ),
  },
  {
    n: "03",
    id: "step-3",
    eyebrow: "Step 03",
    title: "閱讀並接受告知事項",
    sub: "首次登入會跳出資料使用條款，看過後按「接受」即可進入。",
    schKey: "Sch3",
    schCap: ["告知事項 · 同意視窗", "03 / 9"],
    notes: () => (
      <>
        <p>內容是個人資料保護法的提醒，說明系統會記錄您的查詢行為。<strong>只有「接受」才能繼續</strong>。</p>
        <ul>
          <li>每次登入都會出現一次，是正常流程，不是錯誤。</li>
        </ul>
      </>
    ),
  },
  {
    n: "04",
    id: "step-4",
    eyebrow: "Step 04",
    title: "查詢年度選 114 年，並完成 Email 雙重驗證",
    sub: "申辦頁分成「申辦資訊」與「聯絡資訊」兩塊。統編與公司名稱會自動帶入，您只要操作年度與 Email 兩處。",
    schKey: "Sch4",
    schCap: ["線上查調 · 自行查調所得申辦頁", "04 / 9"],
    notes: () => (
      <>
        <p><strong>申辦資訊</strong>：查詢年度下拉選單請選 <span className="pill">民國 114 年</span>。</p>
        <p><strong>聯絡資訊</strong>有三個步驟，缺一不可：</p>
        <ul>
          <li>步驟 1：依畫面輸入<strong>圖形驗證碼</strong>，再填入聯絡 Email，按「<strong>寄送信件驗證碼</strong>」。</li>
          <li>步驟 2：到您的信箱打開系統寄出的郵件，<strong>取得信件驗證碼</strong>。</li>
          <li>步驟 3：回到此頁輸入信件驗證碼，按「<strong>按此驗證</strong>」。</li>
        </ul>
        <p>三個步驟都成功後，按下方的「<strong>我要申辦</strong>」。</p>
      </>
    ),
  },
  {
    n: "05",
    id: "step-5",
    eyebrow: "Step 05",
    title: "預覽申辦內容",
    sub: "系統會跳出整理過的預覽頁面，確認資訊正確後按「確定」。",
    schKey: "Sch5",
    schCap: ["預覽彈窗", "05 / 9"],
    notes: () => (
      <>
        <p>這個畫面是給您再次檢查用的。重點看年度、統編、信箱三項是否正確。</p>
        <ul>
          <li>確認沒問題 → 按「<strong>確定</strong>」。</li>
          <li>有任何一個錯字（特別是 MAIL）→ 按「返回」回上一步修改。</li>
        </ul>
      </>
    ),
  },
  {
    n: "06",
    id: "step-6",
    eyebrow: "Step 06",
    title: "最終確認，正式送出",
    sub: "系統會再跳一次「確認送出」訊息，這一步按下去就無法修改了。",
    schKey: "Sch6",
    schCap: ["最終確認 · 送出", "06 / 9"],
    notes: () => (
      <>
        <p>連續兩次確認是設計上的防呆，不是您按錯。深呼吸，按下「<strong>確認送出</strong>」。</p>
      </>
    ),
  },
  {
    n: "07",
    id: "step-7",
    eyebrow: "Step 07",
    title: "申請完成，記下取件案號",
    sub: "畫面會顯示一份「查調通知」，含取件案號與收件時間。請拍照或截圖留底。",
    schKey: "Sch7",
    schCap: ["查調通知頁", "07 / 9"],
    notes: () => (
      <>
        <p>取件案號的格式類似 <span style={{fontFamily:'var(--mono)'}}>1150428_025610_OLSIMCA005</span>，是日後查詢結果與電洽客服時的識別碼。</p>
        <ul>
          <li>系統會於 <strong>1 小時後</strong>進行結果調閱（繁忙時段可能 1–2 小時）。</li>
          <li>結果完成時會主動寄 Email 通知，可以先去忙別的事。</li>
          <li>客服電話：<strong>0800-080-369</strong>。</li>
        </ul>
      </>
    ),
  },
  {
    n: "08",
    id: "step-8",
    eyebrow: "Step 08",
    title: "重新登入，到「結果調閱」找您的案件",
    sub: "回到 tax.nat.gov.tw，再次以工商憑證登入，從左側選單切換到「結果調閱」。",
    schKey: "Sch8",
    schCap: ["線上查調 · 結果調閱清單", "08 / 9"],
    notes: () => (
      <>
        <p>列表會顯示您所有送過的案件。最新一筆若還在跑，狀態會是 <strong>「尚無結果」</strong>；完成後會出現「結果回傳時間」。</p>
        <ul>
          <li>找到對應案號後，<strong>點該案號</strong>進入明細頁。</li>
          <li>若超過 2 小時仍是「尚無結果」，可重新整理頁面再試。</li>
        </ul>
      </>
    ),
  },
  {
    n: "09",
    id: "step-9",
    eyebrow: "Step 09 · Final",
    title: "進入案件明細，按「下載」並抄下密碼",
    sub: "明細頁會列出 PDF 與 CSV 檔，按「下載」取得加密檔。畫面正中下方會直接顯示一組 10 碼亂數密碼，請務必先抄下。",
    schKey: "Sch9",
    schCap: ["案件明細資料 · 下載與檔案密碼", "09 / 9"],
    notes: () => (
      <>
        <p>密碼會以類似 <span style={{fontFamily:'var(--mono)'}}>uA9XFQMsiJ</span> 的格式顯示，<strong>每筆案件都不同</strong>，是亂數產生的 10 位英數字。</p>
        <ul>
          <li>下載後會得到 <strong>加密 PDF + CSV</strong>，兩個都用同一組密碼開啟。</li>
          <li>本筆資料只保留<strong>一個月</strong>，刪除後就無法再查，建議馬上下載備份。</li>
          <li>PDF 與 CSV 內容若不一致，<strong>以 PDF 為準</strong>。</li>
        </ul>
        <div className="callout">
          <strong>下一步</strong>
          解密成功後，請把 PDF（與 CSV）寄給事務所，我們會根據這份資料替您完成申報。
        </div>
      </>
    ),
  },
];

function Step({ s, onOpen }) {
  const Sch = window.SCHEMATICS[s.schKey];
  return (
    <section className="step" id={s.id} data-screen-label={`${s.n} ${s.title}`}>
      <header className="step-head">
        <div className="step-num">
          <small>{s.eyebrow}</small>
          {s.n}
        </div>
        <div>
          <h2 className="step-title">{s.title}</h2>
          <p className="step-sub">{s.sub}</p>
        </div>
      </header>
      <div className="step-body">
        <div className="step-notes">
          {s.notes()}
        </div>
        <figure className="schematic" style={{margin:0}}>
          <button
            type="button"
            className="schematic-frame is-clickable"
            onClick={onOpen}
            aria-label={`放大檢視：${s.schCap[0]}`}
            style={{ position: 'relative' }}
          >
            <Sch />
            <span className="schematic-zoom-hint" aria-hidden="true">點擊放大</span>
          </button>
          <figcaption className="schematic-cap">
            <b>{s.schCap[0]}</b>
            <span>{s.schCap[1]}</span>
          </figcaption>
        </figure>
      </div>
    </section>
  );
}

function Lightbox({ step, onClose }) {
  const Sch = window.SCHEMATICS[step.schKey];
  useEffect(() => {
    const onKey = (e) => { if (e.key === 'Escape') onClose(); };
    document.addEventListener('keydown', onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = prev;
    };
  }, [onClose]);

  return (
    <div
      className="lightbox"
      role="dialog"
      aria-modal="true"
      aria-label={step.schCap[0]}
      onClick={onClose}
    >
      <div className="lightbox-card" onClick={(e) => e.stopPropagation()}>
        <header className="lightbox-head">
          <div>
            <div className="lightbox-eyebrow">{step.eyebrow}</div>
            <div className="lightbox-title">{step.schCap[0]}</div>
          </div>
          <button
            type="button"
            className="lightbox-close"
            onClick={onClose}
            aria-label="關閉"
          >×</button>
        </header>
        <div className="lightbox-frame">
          <Sch />
        </div>
      </div>
    </div>
  );
}

function Steps() {
  const [active, setActive] = useState(null);
  return (
    <>
      {STEPS.map(s => (
        <Step key={s.id} s={s} onOpen={() => setActive(s)} />
      ))}
      {active && <Lightbox step={active} onClose={() => setActive(null)} />}
    </>
  );
}

ReactDOM.createRoot(document.getElementById('steps-root')).render(<Steps />);

// ---------- Tweaks ----------
const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "theme": "teal",
  "fontSize": 17
}/*EDITMODE-END*/;

function TweaksApp() {
  const [tweaks, setTweak] = window.useTweaks(TWEAK_DEFAULTS);

  useEffect(() => {
    document.documentElement.dataset.theme =
      tweaks.theme === "teal" ? "" : tweaks.theme;
    document.documentElement.style.setProperty('--base-size', `${tweaks.fontSize}px`);
  }, [tweaks.theme, tweaks.fontSize]);

  const { TweaksPanel, TweakSection, TweakRadio, TweakSlider } = window;

  return (
    <TweaksPanel title="Tweaks">
      <TweakSection title="主色調">
        <TweakRadio
          value={tweaks.theme}
          onChange={(v) => setTweak('theme', v)}
          options={[
            { value: 'teal', label: '深青' },
            { value: 'gold', label: '深金' },
            { value: 'navy', label: '深藍' },
            { value: 'ink',  label: '純墨' },
          ]}
        />
      </TweakSection>
      <TweakSection title="字體大小">
        <TweakSlider
          value={tweaks.fontSize}
          onChange={(v) => setTweak('fontSize', v)}
          min={14} max={22} step={1}
          format={(v) => `${v}px`}
        />
      </TweakSection>
    </TweaksPanel>
  );
}

ReactDOM.createRoot(document.getElementById('tweaks-root')).render(<TweaksApp />);
