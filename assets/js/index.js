// ===== ELEMENTS =====
const btnAdd = document.getElementById("Add");
const btnGalxe = document.getElementById("galxeAdd");
const btnGuild = document.getElementById("guildAdd");
const btnAddList = document.getElementById("addList");
const btnWaitlist = document.getElementById("waitlistAdd");
const btnRandom = document.getElementById("randomAdd");
const btnNft = document.getElementById("randomNad");
const close = document.getElementById("close");

const tBodyDashboard = document.querySelector("#dashboard tbody");
const tBodyGalxe = document.querySelector("#galxe tbody");
const tBodyWaitlist = document.querySelector("#waitlist tbody");
const tBodyGuild = document.querySelector("#guild tbody");
const tBodyRandom = document.querySelector("#random tbody");
const tBodyNft = document.querySelector("#nft tbody");

const input1 = document.getElementById("1");
const input2 = document.getElementById("2");
const input3 = document.getElementById("3");
const input4 = document.getElementById("4");
const input5 = document.getElementById("5");
const input7 = document.getElementById("7");
const input8 = document.getElementById("8");
const input9 = document.getElementById("9");

function showToast(msg, type = "success") {
  const toast = document.getElementById("toast");
  toast.textContent = msg;
  toast.className = `toast show ${type}`;
  setTimeout(() => { toast.className = "toast"; }, 2800);
}

const bulan = ["Januari","Februari","Maret","April","Mei","Juni","Juli","Agustus","September","Oktober","November","Desember"];
const hari = ["Minggu","Senin","Selasa","Rabu","Kamis","Jum'at","Sabtu"];

function jams() {
  const w = new Date();
  const pad = n => String(n).padStart(2, "0");
  document.querySelector(".day").innerHTML =
    `${hari[w.getDay()]}, ${w.getDate()} ${bulan[w.getMonth()]} ${w.getFullYear()} / ${pad(w.getHours())}:${pad(w.getMinutes())}:${pad(w.getSeconds())}`;
}
jams();
setInterval(jams, 1000);

const hamburger = document.getElementById("hamburger");
const navMenu = document.getElementById("navMenu");
const navOverlay = document.getElementById("navOverlay");

function closeNav() {
  hamburger.classList.remove("open");
  navMenu.classList.remove("open");
  navOverlay.classList.remove("active");
}

hamburger.addEventListener("click", () => {
  const isOpen = navMenu.classList.toggle("open");
  hamburger.classList.toggle("open", isOpen);
  navOverlay.classList.toggle("active", isOpen);
});

navOverlay.addEventListener("click", closeNav);

const navLinks = document.querySelectorAll('.navbar .menu > a');
navLinks.forEach(link => {
  link.addEventListener('click', (e) => {
    e.preventDefault();
    navLinks.forEach(l => l.classList.remove('active'));
    e.currentTarget.classList.add('active');
    const targetId = link.getAttribute('href');
    document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
    document.querySelector(targetId).classList.add('active');
    closeNav();
  });
});

let activeTable = "dashboard";
let editingRow = null;

function getBodyContainingRow(row) {
  if (tBodyDashboard?.contains(row)) return tBodyDashboard;
  if (tBodyGalxe?.contains(row)) return tBodyGalxe;
  if (tBodyGuild?.contains(row)) return tBodyGuild;
  if (tBodyWaitlist?.contains(row)) return tBodyWaitlist;
  if (tBodyRandom?.contains(row)) return tBodyRandom;
  if (tBodyNft?.contains(row)) return tBodyNft;
  return null;
}

const storageKeys = {
  dashboard: "airdrops",
  galxe: "airdropsGalxe",
  guild: "airdropsGuild",
  waitlist: "airdropsWaitlist",
  random: "airdropsRandom",
  nft: "airdropsNft"
};

const tBodyMap = {
  dashboard: tBodyDashboard,
  galxe: tBodyGalxe,
  guild: tBodyGuild,
  waitlist: tBodyWaitlist,
  random: tBodyRandom,
  nft: tBodyNft
};

function getKeyForContainer(container) {
  for (const [key, tbody] of Object.entries(tBodyMap)) {
    if (tbody === container) return storageKeys[key];
  }
  return null;
}

function saveByContainer(container) {
  const key = getKeyForContainer(container);
  if (!key || !container) return;
  const rows = [...container.querySelectorAll("tr")].map(extractRowData);
  localStorage.setItem(key, JSON.stringify(rows));
}

document.getElementById("start").addEventListener("click", () => {
  document.querySelectorAll(".status-ok").forEach(cell => {
    cell.textContent = "❌";
    cell.classList.remove("done");
  });
  Object.values(tBodyMap).forEach(tbody => saveByContainer(tbody));
  showToast("✅ Status semua direset!");
});

const formOverlay = document.getElementById("formOverlay");

function openForm(table) {
  activeTable = table;
  if (btnAddList.textContent === "Update") btnAddList.textContent = "Tambah";
  document.querySelector(".form").classList.add("active");
  formOverlay.classList.add("active");
}

function closeForm() {
  document.querySelector(".form").classList.remove("active");
  formOverlay.classList.remove("active");
  resetForm();
}

formOverlay.addEventListener("click", closeForm);

btnAdd.addEventListener("click", () => openForm("dashboard"));
btnGalxe.addEventListener("click", () => openForm("galxe"));
btnGuild.addEventListener("click", () => openForm("guild"));
btnWaitlist.addEventListener("click", () => openForm("waitlist"));
btnRandom.addEventListener("click", () => openForm("random"));
btnNft.addEventListener("click", () => openForm("nft"));
close.addEventListener("click", closeForm);

function resetForm() {
  [input1,input2,input3,input4,input5,input7,input8,input9].forEach(i => i.value = "");
  editingRow = null;
}

btnAddList.addEventListener("click", () => {
  if (editingRow) {
    editingRow.querySelector(".cell-image img").src = input2.value || "";
    editingRow.querySelector(".name-text").textContent = input1.value || "";
    const set = (sel, prop) => { const el = editingRow.querySelector(sel); if (el) el[prop] = (input3.value || ""); };
    editingRow.querySelector(".cell-link a").href = input3.value || "";
    editingRow.querySelector(".cell-twitter a").href = input4.value || "";
    editingRow.querySelector(".cell-discord a").href = input5.value || "";
    editingRow.querySelector(".cell-date").textContent = input7.value || "";
    editingRow.querySelector(".cell-stage span").textContent = input8.value || "";
    editingRow.querySelector(".cell-type span").textContent = input9.value || "";
    const container = getBodyContainingRow(editingRow);
    editingRow = null;
    saveByContainer(container);
    showToast("✏️ Data diupdate!");
  } else {
    const tr = document.createElement("tr");
    tr.setAttribute("draggable", "true");
    const now = new Date();
    const pad = n => String(n).padStart(2,"0");
    const nowStr = `${now.getDate()}-${now.getMonth()+1}-${now.getFullYear()} / ${pad(now.getHours())}:${pad(now.getMinutes())}:${pad(now.getSeconds())}`;
    tr.innerHTML = buildRowHTML({
      image: input2.value, name: input1.value, link: input3.value,
      twitter: input4.value, discord: input5.value, date: input7.value,
      stage: input8.value, type: input9.value, last: nowStr, done: false
    });
    const targetBody = tBodyMap[activeTable];
    if (!targetBody) return;
    targetBody.prepend(tr);
    attachEvents(tr);
    feather.replace();
    saveByContainer(targetBody);
    showToast("🚀 Airdrop ditambahkan!");
  }
  closeForm();
});

function buildRowHTML(item) {
  return `
    <td class="cell-image" data-label="Project">
      <img src="${item.image || ''}" onerror="this.style.display='none'">
      <span class="name-text">${item.name || ''}</span>
      <button class="btn-edit"><i data-feather="edit"></i></button>
    </td>
    <td class="cell-link" data-label="Link"><a href="${item.link || ''}" target="_blank"><i data-feather="external-link"></i></a></td>
    <td class="cell-twitter" data-label="Twitter"><a href="${item.twitter || ''}" target="_blank"><i data-feather="twitter"></i></a></td>
    <td class="cell-discord" data-label="Discord"><a href="${item.discord || ''}" target="_blank"><i data-feather="monitor"></i></a></td>
    <td class="status-ok ${item.done ? 'done' : ''}" data-label="Status">${item.done ? '✔' : '❌'}</td>
    <td class="cell-date" data-label="Join Date">${item.date || ''}</td>
    <td class="cell-stage" data-label="Stage"><span class="badge badge-mainnet">${item.stage || ''}</span></td>
    <td class="cell-type" data-label="Task"><span class="badge badge-claim">${item.type || ''}</span></td>
    <td class="cell-last" data-label="Last Activity"><span>${item.last || ''}</span><button class="btn-del"><i class="dell" data-feather="trash-2"></i></button></td>
  `;
}

function extractRowData(tr) {
  return {
    image: tr.querySelector(".cell-image img")?.src || "",
    name: tr.querySelector(".name-text")?.textContent.trim() || "",
    link: tr.querySelector(".cell-link a")?.href || "",
    twitter: tr.querySelector(".cell-twitter a")?.href || "",
    discord: tr.querySelector(".cell-discord a")?.href || "",
    date: tr.querySelector(".cell-date")?.textContent || "",
    stage: tr.querySelector(".cell-stage span")?.textContent || "",
    type: tr.querySelector(".cell-type span")?.textContent || "",
    last: tr.querySelector(".cell-last span")?.textContent || "",
    done: tr.querySelector(".status-ok")?.textContent.trim() === "✔"
  };
}

function attachEvents(tr) {
  addEditEvent(tr);
  addLinkEvent(tr);
  addDeleteEvent(tr);
  addDragEvent(tr);
}

function addEditEvent(row) {
  const btn = row.querySelector(".btn-edit");
  if (!btn) return;
  btn.addEventListener("click", () => {
    btnAddList.textContent = "Update";
    editingRow = row;
    document.querySelector(".form").classList.add("active");
    formOverlay.classList.add("active");
    input1.value = row.querySelector(".name-text")?.textContent.trim() || "";
    input2.value = row.querySelector(".cell-image img")?.src || "";
    input3.value = row.querySelector(".cell-link a")?.href || "";
    input4.value = row.querySelector(".cell-twitter a")?.href || "";
    input5.value = row.querySelector(".cell-discord a")?.href || "";
    input7.value = row.querySelector(".cell-date")?.textContent || "";
    input8.value = row.querySelector(".cell-stage span")?.textContent || "";
    input9.value = row.querySelector(".cell-type span")?.textContent || "";
  });
}

function addLinkEvent(row) {
  const statusCell = row.querySelector(".status-ok");
  if (!statusCell) return;
  statusCell.style.cursor = "pointer";
  statusCell.addEventListener("click", () => {
    const isDone = statusCell.textContent.trim() === "✔";
    statusCell.textContent = isDone ? "❌" : "✔";
    statusCell.classList.toggle("done", !isDone);
    const now = new Date();
    const pad = n => String(n).padStart(2,"0");
    const timeStr = `${now.getDate()}-${now.getMonth()+1}-${now.getFullYear()} / ${pad(now.getHours())}:${pad(now.getMinutes())}:${pad(now.getSeconds())}`;
    const lastCell = row.querySelector(".cell-last");
    if (lastCell) {
      lastCell.innerHTML = `<span>${timeStr}</span><button class="btn-del"><i class="dell" data-feather="trash-2"></i></button>`;
      addDeleteEvent(row);
      feather.replace();
    }
    const container = getBodyContainingRow(row);
    saveByContainer(container);
  });
}

function addDeleteEvent(row) {
  const btn = row.querySelector(".btn-del");
  if (!btn) return;
  const handler = () => {
    if (!confirm("Yakin mau hapus data ini?")) return;
    const container = getBodyContainingRow(row);
    row.remove();
    if (container) saveByContainer(container);
    showToast("🗑️ Data dihapus.");
  };
  btn.replaceWith(btn.cloneNode(true));
  const newBtn = row.querySelector(".btn-del");
  if (newBtn) newBtn.addEventListener("click", handler);
}

let draggedRow = null;

function addDragEvent(row) {
  row.addEventListener("dragstart", () => {
    draggedRow = row;
    row.classList.add("dragging");
  });
  row.addEventListener("dragend", () => {
    row.classList.remove("dragging");
    const container = getBodyContainingRow(row);
    draggedRow = null;
    saveByContainer(container);
  });
}

function enableDragSort(tbody) {
  if (!tbody) return;
  tbody.addEventListener("dragover", (e) => {
    e.preventDefault();
    if (!draggedRow) return;
    const afterElement = getDragAfterElement(tbody, e.clientY);
    if (afterElement == null) tbody.appendChild(draggedRow);
    else tbody.insertBefore(draggedRow, afterElement);
  });
}

function getDragAfterElement(container, y) {
  const rows = [...container.querySelectorAll("tr:not(.dragging)")];
  return rows.reduce((closest, child) => {
    const box = child.getBoundingClientRect();
    const offset = y - box.top - box.height / 2;
    if (offset < 0 && offset > closest.offset) return { offset, element: child };
    return closest;
  }, { offset: Number.NEGATIVE_INFINITY }).element;
}

function loadTable(key, tbody) {
  const rows = JSON.parse(localStorage.getItem(key) || "[]");
  if (!tbody) return;
  tbody.innerHTML = "";
  rows.forEach(item => {
    const tr = document.createElement("tr");
    tr.setAttribute("draggable", "true");
    tr.innerHTML = buildRowHTML(item);
    tbody.appendChild(tr);
    attachEvents(tr);
  });
  feather.replace();
}

document.getElementById("exportBtn").addEventListener("click", () => {
  const allData = {};
  for (const [section, key] of Object.entries(storageKeys)) {
    allData[section] = JSON.parse(localStorage.getItem(key) || "[]");
  }
  const blob = new Blob([JSON.stringify(allData, null, 2)], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  const date = new Date();
  a.href = url;
  a.download = `airdrop-backup-${date.getFullYear()}${String(date.getMonth()+1).padStart(2,"0")}${String(date.getDate()).padStart(2,"0")}.json`;
  a.click();
  URL.revokeObjectURL(url);
  showToast("📦 Data berhasil diexport!");
  closeNav();
});

document.getElementById("importFile").addEventListener("change", (e) => {
  const file = e.target.files[0];
  if (!file) return;
  const reader = new FileReader();
  reader.onload = (ev) => {
    try {
      const data = JSON.parse(ev.target.result);
      let count = 0;
      for (const [section, key] of Object.entries(storageKeys)) {
        if (Array.isArray(data[section])) {
          localStorage.setItem(key, JSON.stringify(data[section]));
          count += data[section].length;
        }
      }
      // Reload semua tabel
      for (const [section, key] of Object.entries(storageKeys)) {
        loadTable(key, tBodyMap[section]);
      }
      showToast(`✅ Import berhasil! ${count} item dimuat.`);
    } catch (err) {
      showToast("❌ File tidak valid!", "error");
    }
  };
  reader.readAsText(file);
  e.target.value = ""; 
  closeNav();
});

window.addEventListener("DOMContentLoaded", () => {
  for (const [section, key] of Object.entries(storageKeys)) {
    loadTable(key, tBodyMap[section]);
    enableDragSort(tBodyMap[section]);
  }
});
