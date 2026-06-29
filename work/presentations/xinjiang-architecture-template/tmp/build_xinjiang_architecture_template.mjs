import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { Presentation, PresentationFile } from "@oai/artifact-tool";

const __filename = fileURLToPath(import.meta.url);
const TMP_DIR = path.dirname(__filename);
const ASSET_DIR = path.join(TMP_DIR, "assets");
const PREVIEW_DIR = path.join(TMP_DIR, "preview");
const LAYOUT_DIR = path.join(TMP_DIR, "layout");
const OUTPUT_DIR = path.resolve(TMP_DIR, "..", "..", "..", "outputs");
const FINAL_PPTX = path.join(OUTPUT_DIR, "新疆建筑文化数字化展示PPT模板.pptx");

const W = 1280;
const H = 720;
const colors = {
  ink: "#201412",
  deep: "#351A16",
  red: "#8F2E24",
  clay: "#B45B39",
  sand: "#E8D8B8",
  paper: "#F6EFD9",
  gold: "#D6A849",
  teal: "#1F8F8A",
  cyan: "#5FC7C2",
  cream: "#FFF8E8",
  smoke: "#5E5148",
};

async function readImageBlob(imagePath) {
  const bytes = await fs.readFile(imagePath);
  return bytes.buffer.slice(bytes.byteOffset, bytes.byteOffset + bytes.byteLength);
}

async function writeBlob(outPath, blob) {
  await fs.writeFile(outPath, new Uint8Array(await blob.arrayBuffer()));
}

function addShape(slide, geometry, position, fill, line = { style: "solid", fill: "none", width: 0 }, extra = {}) {
  return slide.shapes.add({ geometry, position, fill, line, ...extra });
}

function addText(slide, text, position, style = {}, options = {}) {
  const box = addShape(slide, "textbox", position, "none");
  box.text = text;
  box.text.style = {
    fontFace: "Microsoft YaHei",
    fontSize: 18,
    color: colors.deep,
    breakLine: false,
    ...style,
  };
  if (options.name) box.name = options.name;
  return box;
}

function addFooter(slide, index, section = "新疆建筑文化遗产数字化保护与文旅融合") {
  addShape(slide, "line", { left: 70, top: 665, width: 1140, height: 0 }, "none", {
    style: "solid",
    fill: colors.gold,
    width: 1,
  });
  addText(slide, section, { left: 76, top: 676, width: 720, height: 24 }, {
    fontSize: 13,
    color: colors.smoke,
  });
  addText(slide, String(index).padStart(2, "0"), { left: 1144, top: 670, width: 64, height: 28 }, {
    fontSize: 18,
    bold: true,
    color: colors.red,
    alignment: "right",
  });
}

function addTitle(slide, title, kicker, index) {
  addText(slide, kicker, { left: 74, top: 48, width: 500, height: 28 }, {
    fontSize: 15,
    bold: true,
    color: colors.teal,
  });
  addText(slide, title, { left: 72, top: 82, width: 830, height: 54 }, {
    fontSize: 38,
    bold: true,
    color: colors.deep,
  });
  addShape(slide, "rect", { left: 72, top: 146, width: 114, height: 6 }, colors.gold);
  addFooter(slide, index);
}

function addMotifBand(slide, y, height = 28, left = 0, width = W) {
  addShape(slide, "rect", { left, top: y, width, height }, colors.red);
  const count = Math.ceil(width / 52);
  for (let i = 0; i < count; i += 1) {
    const x = left + i * 52 + 12;
    addShape(slide, "diamond", { left: x, top: y + 6, width: 16, height: 16 }, colors.gold);
    addShape(slide, "diamond", { left: x + 22, top: y + 8, width: 12, height: 12 }, colors.cyan);
  }
}

function addSmallPattern(slide, x, y, rows = 4, cols = 7) {
  for (let r = 0; r < rows; r += 1) {
    for (let c = 0; c < cols; c += 1) {
      const cx = x + c * 30;
      const cy = y + r * 27;
      addText(slide, "@", { left: cx, top: cy, width: 24, height: 20 }, {
        fontSize: 17,
        bold: true,
        color: r % 2 === 0 ? colors.red : colors.clay,
        alignment: "center",
      });
    }
  }
}

async function addImage(slide, assetName, position, alt, crop, fit = "cover", radius = 0) {
  const blob = await readImageBlob(path.join(ASSET_DIR, assetName));
  return slide.images.add({
    blob,
    contentType: "image/png",
    alt,
    fit,
    position,
    ...(crop ? { crop } : {}),
    ...(radius ? { geometry: "roundRect", borderRadius: radius } : {}),
  });
}

async function cover(presentation) {
  const slide = presentation.slides.add();
  slide.background.fill = colors.ink;
  await addImage(slide, "reference_clean_1.png", { left: 0, top: 315, width: 1280, height: 310 }, "织带水墨风格参考图", null, "cover");
  addShape(slide, "rect", { left: 0, top: 0, width: W, height: H }, "#201412B8");
  addMotifBand(slide, 620, 34);
  addText(slide, "新疆建筑文化数字化展示系统", { left: 76, top: 96, width: 870, height: 70 }, {
    fontSize: 52,
    bold: true,
    color: colors.cream,
  });
  addText(slide, "中华建筑文化交融 · 生土营造 · 知识图谱 · 沉浸式体验", { left: 82, top: 178, width: 790, height: 38 }, {
    fontSize: 24,
    color: colors.gold,
  });
  addText(slide, "PPT模板 / Xinjiang Architecture Heritage Digital Narrative", { left: 84, top: 247, width: 760, height: 32 }, {
    fontSize: 18,
    color: "#F6EFD9",
  });
  addShape(slide, "rect", { left: 945, top: 86, width: 210, height: 210 }, "#D6A84928", {
    style: "solid",
    fill: colors.gold,
    width: 1,
  });
  addSmallPattern(slide, 966, 112, 5, 5);
}

async function agenda(presentation) {
  const slide = presentation.slides.add();
  slide.background.fill = colors.paper;
  addTitle(slide, "展示结构", "CONTENT FRAMEWORK", 2);
  await addImage(slide, "reference_clean_3.png", { left: 870, top: 0, width: 410, height: 720 }, "拱形生土墙空间参考图", { left: 0.02, top: 0.08, right: 0.12, bottom: 0.1 });
  addShape(slide, "rect", { left: 838, top: 0, width: 442, height: 720 }, "#F6EFD9A8");
  const items = [
    ["01", "文化交融背景", "中原营造技艺与西域生土传统交汇共生"],
    ["02", "内容服务体系", "类型概览、结构特征、纹样装饰、经典建筑赏析"],
    ["03", "算法洞察", "PCA、K-Means、Pearson、二次回归拟合"],
    ["04", "可视化交互", "28个ECharts图表与双向感知联动机制"],
  ];
  items.forEach(([num, title, body], i) => {
    const top = 190 + i * 96;
    addText(slide, num, { left: 86, top, width: 70, height: 38 }, {
      fontSize: 30,
      bold: true,
      color: colors.gold,
    });
    addText(slide, title, { left: 168, top: top - 2, width: 310, height: 34 }, {
      fontSize: 25,
      bold: true,
      color: colors.red,
    });
    addText(slide, body, { left: 168, top: top + 38, width: 570, height: 38 }, {
      fontSize: 17,
      color: colors.deep,
    });
    addShape(slide, "line", { left: 86, top: top + 78, width: 610, height: 0 }, "none", {
      style: "solid",
      fill: "#D6A84970",
      width: 1,
    });
  });
}

async function background(presentation) {
  const slide = presentation.slides.add();
  slide.background.fill = colors.ink;
  await addImage(slide, "reference_clean_2.png", { left: 0, top: 0, width: 1280, height: 720 }, "舞台群像式构图参考图", { left: 0.02, top: 0.03, right: 0.02, bottom: 0.06 });
  addShape(slide, "rect", { left: 0, top: 0, width: W, height: H }, "#201412C8");
  addText(slide, "项目背景", { left: 72, top: 64, width: 420, height: 60 }, {
    fontSize: 42,
    bold: true,
    color: colors.cream,
  });
  addText(slide, "珍贵建筑文化资源多散落于传统载体与学术文献，缺乏系统性的数字化整合与沉浸式体验平台。", { left: 74, top: 142, width: 760, height: 86 }, {
    fontSize: 25,
    color: colors.gold,
  });
  const cards = [
    ["散落", "历史建筑、纹样、结构知识分布零散"],
    ["难感知", "传统展示难以形成沉浸式理解"],
    ["待转译", "学术资源需要变成可计算、可交互内容"],
  ];
  cards.forEach(([head, body], i) => {
    const left = 74 + i * 360;
    addShape(slide, "roundRect", { left, top: 438, width: 310, height: 138 }, "#FFF8E8E8", {
      style: "solid",
      fill: "#D6A849A0",
      width: 1,
    }, { borderRadius: "rounded-xl" });
    addText(slide, head, { left: left + 26, top: 460, width: 120, height: 34 }, {
      fontSize: 28,
      bold: true,
      color: colors.red,
    });
    addText(slide, body, { left: left + 28, top: 507, width: 250, height: 48 }, {
      fontSize: 17,
      color: colors.deep,
    });
  });
}

async function narrative(presentation) {
  const slide = presentation.slides.add();
  slide.background.fill = colors.paper;
  addTitle(slide, "核心叙事主线", "CULTURAL FUSION NARRATIVE", 4);
  await addImage(slide, "reference_clean_1.png", { left: 0, top: 250, width: 1280, height: 235 }, "织带水墨风格参考图", null, "cover");
  addShape(slide, "rect", { left: 0, top: 228, width: W, height: 286 }, "#F6EFD9A0");
  const flow = [
    ["中原营造思想传播", "抬梁式木构架、斗拱榫卯"],
    ["西域生土传统", "厚生土墙、庭院遮阳、阿以旺民居"],
    ["交融共生遗产", "两千余年建筑文化融合图景"],
  ];
  flow.forEach(([head, body], i) => {
    const left = 100 + i * 380;
    addShape(slide, "ellipse", { left, top: 290, width: 210, height: 210 }, "#FFF8E8E6", {
      style: "solid",
      fill: colors.gold,
      width: 2,
    });
    addText(slide, head, { left: left + 26, top: 344, width: 158, height: 52 }, {
      fontSize: 24,
      bold: true,
      color: colors.red,
      alignment: "center",
    });
    addText(slide, body, { left: left + 28, top: 416, width: 154, height: 52 }, {
      fontSize: 15,
      color: colors.deep,
      alignment: "center",
    });
    if (i < 2) {
      addText(slide, "→", { left: left + 258, top: 362, width: 80, height: 48 }, {
        fontSize: 46,
        bold: true,
        color: colors.teal,
        alignment: "center",
      });
    }
  });
}

async function systems(presentation) {
  const slide = presentation.slides.add();
  slide.background.fill = colors.cream;
  addTitle(slide, "两级体系结构", "ARCHITECTURAL SYSTEMS", 5);
  const left = { x: 76, y: 188, w: 520, h: 360 };
  const right = { x: 686, y: 188, w: 520, h: 360 };
  addShape(slide, "roundRect", { left: left.x, top: left.y, width: left.w, height: left.h }, "#F6EFD9", {
    style: "solid",
    fill: "#D6A849",
    width: 1,
  }, { borderRadius: "rounded-xl" });
  addShape(slide, "roundRect", { left: right.x, top: right.y, width: right.w, height: right.h }, "#F3E0CC", {
    style: "solid",
    fill: colors.clay,
    width: 1,
  }, { borderRadius: "rounded-xl" });
  addText(slide, "中原体系", { left: left.x + 32, top: left.y + 34, width: 200, height: 40 }, {
    fontSize: 31,
    bold: true,
    color: colors.red,
  });
  addText(slide, "抬梁式木构架 / 斗拱 / 榫卯 / 礼制空间", { left: left.x + 34, top: left.y + 96, width: 425, height: 54 }, {
    fontSize: 20,
    color: colors.deep,
  });
  addText(slide, "本土体系", { left: right.x + 32, top: right.y + 34, width: 200, height: 40 }, {
    fontSize: 31,
    bold: true,
    color: colors.red,
  });
  addText(slide, "厚生土墙 / 阿以旺民居 / 庭院遮阳 / 气候适应", { left: right.x + 34, top: right.y + 96, width: 425, height: 54 }, {
    fontSize: 20,
    color: colors.deep,
  });
  addMotifBand(slide, 518, 30, 76, 1130);
}

async function buildingCluster(presentation) {
  const slide = presentation.slides.add();
  slide.background.fill = colors.paper;
  addTitle(slide, "十二座代表性建筑特征聚类", "K-MEANS CLUSTER VIEW", 6);
  const names = ["高昌故城", "交河故城", "柏孜克里克", "香妃园", "喀什民居", "吐鲁番民居", "伊犁将军府", "惠远钟鼓楼", "库车王府", "阿以旺庭院", "生土院落", "木构廊架"];
  names.forEach((name, i) => {
    const col = i % 4;
    const row = Math.floor(i / 4);
    const x = 92 + col * 286;
    const y = 188 + row * 118;
    const fill = [colors.red, colors.teal, colors.gold][row];
    addShape(slide, "roundRect", { left: x, top: y, width: 232, height: 76 }, "#FFF8E8", {
      style: "solid",
      fill,
      width: 2,
    }, { borderRadius: "rounded-xl" });
    addText(slide, name, { left: x + 22, top: y + 18, width: 188, height: 26 }, {
      fontSize: 20,
      bold: true,
      color: colors.deep,
      alignment: "center",
    });
    addText(slide, `C${row + 1} · ${(i % 3) + 1}维特征`, { left: x + 30, top: y + 47, width: 172, height: 20 }, {
      fontSize: 12,
      color: colors.smoke,
      alignment: "center",
    });
  });
  addText(slide, "模板提示：可替换为真实K-Means聚类结果、PCA散点图或建筑案例矩阵。", { left: 94, top: 560, width: 760, height: 32 }, {
    fontSize: 17,
    color: colors.red,
  });
}

async function structure(presentation) {
  const slide = presentation.slides.add();
  slide.background.fill = colors.cream;
  addTitle(slide, "建筑结构特征", "STRUCTURE FEATURES", 7);
  await addImage(slide, "reference_clean_3.png", { left: 768, top: 150, width: 400, height: 460 }, "拱形生土墙空间参考图", { left: 0.06, top: 0.09, right: 0.18, bottom: 0.18 }, "cover", "rounded-xl");
  const items = [
    ["抬梁式木构架", "体现中原木作秩序与空间层级"],
    ["厚生土墙", "回应干旱气候与保温隔热需求"],
    ["阿以旺民居", "庭院组织生活、遮阳与通风"],
    ["斗拱榫卯", "结构节点与装饰语言共同显影"],
  ];
  items.forEach(([head, body], i) => {
    const y = 190 + i * 88;
    addShape(slide, "diamond", { left: 86, top: y + 8, width: 28, height: 28 }, i % 2 ? colors.teal : colors.gold);
    addText(slide, head, { left: 132, top: y, width: 270, height: 30 }, {
      fontSize: 24,
      bold: true,
      color: colors.red,
    });
    addText(slide, body, { left: 132, top: y + 38, width: 520, height: 32 }, {
      fontSize: 17,
      color: colors.deep,
    });
  });
}

async function ornament(presentation) {
  const slide = presentation.slides.add();
  slide.background.fill = colors.paper;
  addTitle(slide, "建筑装饰纹样融合", "ORNAMENT PATTERN", 8);
  addSmallPattern(slide, 82, 188, 8, 13);
  addShape(slide, "rect", { left: 0, top: 514, width: W, height: 74 }, colors.deep);
  addMotifBand(slide, 534, 34);
  const items = [
    ["龙凤花卉", "中原吉祥纹样的空间传播"],
    ["星纹蔓草", "西域几何与植物纹样延展"],
    ["色彩交织", "赭红、金色、青绿形成传统调性"],
  ];
  items.forEach(([head, body], i) => {
    const x = 560 + (i % 2) * 310;
    const y = 190 + Math.floor(i / 2) * 140;
    addShape(slide, "roundRect", { left: x, top: y, width: 280, height: 104 }, "#FFF8E8", {
      style: "solid",
      fill: colors.gold,
      width: 1,
    }, { borderRadius: "rounded-xl" });
    addText(slide, head, { left: x + 24, top: y + 20, width: 220, height: 30 }, {
      fontSize: 24,
      bold: true,
      color: colors.red,
    });
    addText(slide, body, { left: x + 24, top: y + 58, width: 228, height: 32 }, {
      fontSize: 15,
      color: colors.deep,
    });
  });
}

async function climate(presentation) {
  const slide = presentation.slides.add();
  slide.background.fill = colors.cream;
  addTitle(slide, "气候适应营造策略", "CLIMATE ADAPTIVE WISDOM", 9);
  const strategies = [
    ["厚生土墙", "高热惰性材料缓冲昼夜温差"],
    ["庭院遮阳", "院落组织形成可调节微气候"],
    ["高窗采光", "减少直射热量并引入柔和自然光"],
    ["通风廊架", "木构廊架组织阴影与空气流动"],
  ];
  strategies.forEach(([head, body], i) => {
    const x = 92 + (i % 2) * 540;
    const y = 190 + Math.floor(i / 2) * 160;
    addShape(slide, "roundRect", { left: x, top: y, width: 460, height: 112 }, i % 2 ? "#E2F2ED" : "#F6EFD9", {
      style: "solid",
      fill: i % 2 ? colors.teal : colors.gold,
      width: 2,
    }, { borderRadius: "rounded-xl" });
    addText(slide, head, { left: x + 28, top: y + 22, width: 170, height: 32 }, {
      fontSize: 27,
      bold: true,
      color: colors.red,
    });
    addText(slide, body, { left: x + 28, top: y + 66, width: 380, height: 32 }, {
      fontSize: 17,
      color: colors.deep,
    });
  });
}

async function tech(presentation) {
  const slide = presentation.slides.add();
  slide.background.fill = colors.paper;
  addTitle(slide, "技术实现路径", "TECHNICAL ARCHITECTURE", 10);
  const layers = [
    ["前端呈现", "HTML5 / CSS3 / JavaScript", colors.red],
    ["可视化层", "28个ECharts图表", colors.teal],
    ["算法层", "PCA / K-Means / Pearson / 二次回归", colors.gold],
    ["内容层", "建筑类型、结构、纹样、气候策略、经典案例", colors.clay],
  ];
  layers.forEach(([head, body, fill], i) => {
    const y = 188 + i * 94;
    addShape(slide, "roundRect", { left: 120, top: y, width: 900, height: 60 }, "#FFF8E8", {
      style: "solid",
      fill,
      width: 2,
    }, { borderRadius: "rounded-xl" });
    addText(slide, head, { left: 150, top: y + 14, width: 180, height: 32 }, {
      fontSize: 23,
      bold: true,
      color: colors.red,
    });
    addText(slide, body, { left: 350, top: y + 16, width: 610, height: 30 }, {
      fontSize: 20,
      color: colors.deep,
    });
  });
  addText(slide, "从静态建筑文化资源到可计算、可交互、可感知的数字叙事", { left: 170, top: 580, width: 770, height: 34 }, {
    fontSize: 22,
    bold: true,
    color: colors.teal,
    alignment: "center",
  });
}

async function interaction(presentation) {
  const slide = presentation.slides.add();
  slide.background.fill = colors.cream;
  addTitle(slide, "双向感知联动机制", "INTERACTION DESIGN", 11);
  const nodes = [
    ["旭日图扇区", "切换联动卡片"],
    ["雷达图数据点", "联动专题介绍"],
    ["纹样图表节点", "高亮对应图卡"],
  ];
  nodes.forEach(([a, b], i) => {
    const x = 110 + i * 360;
    addShape(slide, "ellipse", { left: x, top: 228, width: 210, height: 210 }, "#FFF8E8", {
      style: "solid",
      fill: i === 0 ? colors.gold : i === 1 ? colors.teal : colors.red,
      width: 2,
    });
    addText(slide, a, { left: x + 28, top: 286, width: 154, height: 34 }, {
      fontSize: 23,
      bold: true,
      color: colors.red,
      alignment: "center",
    });
    addText(slide, "⇄", { left: x + 68, top: 326, width: 76, height: 42 }, {
      fontSize: 34,
      bold: true,
      color: colors.teal,
      alignment: "center",
    });
    addText(slide, b, { left: x + 24, top: 375, width: 162, height: 34 }, {
      fontSize: 18,
      color: colors.deep,
      alignment: "center",
    });
  });
  addText(slide, "突破传统建筑展示平台单向输出模式，实现数据索引映射与算法降维转译。", { left: 150, top: 520, width: 980, height: 42 }, {
    fontSize: 24,
    bold: true,
    color: colors.deep,
    alignment: "center",
  });
}

async function closing(presentation) {
  const slide = presentation.slides.add();
  slide.background.fill = colors.ink;
  await addImage(slide, "reference_clean_1.png", { left: 0, top: 360, width: 1280, height: 240 }, "织带水墨风格参考图", null, "cover");
  addShape(slide, "rect", { left: 0, top: 0, width: W, height: H }, "#201412CC");
  addText(slide, "传播中华建筑文化交融之美", { left: 118, top: 148, width: 890, height: 70 }, {
    fontSize: 50,
    bold: true,
    color: colors.cream,
  });
  addText(slide, "让新疆建筑文化遗产在数字化保护、文旅融合与活态传承中被看见、被理解、被体验。", { left: 124, top: 244, width: 840, height: 72 }, {
    fontSize: 25,
    color: colors.gold,
  });
  addMotifBand(slide, 620, 34);
  addText(slide, "THANK YOU", { left: 996, top: 586, width: 190, height: 40 }, {
    fontSize: 24,
    bold: true,
    color: colors.cream,
    alignment: "right",
  });
}

async function main() {
  await fs.mkdir(PREVIEW_DIR, { recursive: true });
  await fs.mkdir(LAYOUT_DIR, { recursive: true });
  await fs.mkdir(OUTPUT_DIR, { recursive: true });

  const presentation = Presentation.create({
    slideSize: { width: W, height: H },
  });

  await cover(presentation);
  await agenda(presentation);
  await background(presentation);
  await narrative(presentation);
  await systems(presentation);
  await buildingCluster(presentation);
  await structure(presentation);
  await ornament(presentation);
  await climate(presentation);
  await tech(presentation);
  await interaction(presentation);
  await closing(presentation);

  for (const [index, slide] of presentation.slides.items.entries()) {
    const stem = `slide-${String(index + 1).padStart(2, "0")}`;
    await writeBlob(path.join(PREVIEW_DIR, `${stem}.png`), await presentation.export({ slide, format: "png", scale: 1 }));
    await fs.writeFile(path.join(LAYOUT_DIR, `${stem}.layout.json`), await (await slide.export({ format: "layout" })).text());
  }
  await writeBlob(path.join(PREVIEW_DIR, "montage.webp"), await presentation.export({ format: "webp", montage: true, scale: 1 }));

  const pptx = await PresentationFile.exportPptx(presentation);
  await pptx.save(FINAL_PPTX);
  console.log(FINAL_PPTX);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
