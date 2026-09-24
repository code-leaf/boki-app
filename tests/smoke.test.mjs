// 主要ページが正しく開けるかを確かめる簡易テスト
// node:test と fetch だけを使い、追加のパッケージは使わない
import { test, before, after } from 'node:test';
import assert from 'node:assert/strict';
import { spawn } from 'node:child_process';

const PORT = process.env.SMOKE_TEST_PORT || '4310';
const BASE_URL = `http://localhost:${PORT}`;

let serverProcess;

// next start でアプリを起動し、応答が返るまで待つ
async function waitForServer(url, timeoutMs = 60000) {
  const start = Date.now();
  while (Date.now() - start < timeoutMs) {
    try {
      const res = await fetch(url);
      if (res.ok || res.status < 500) return;
    } catch {
      // まだ起動していない
    }
    await new Promise((r) => setTimeout(r, 500));
  }
  throw new Error(`サーバーが ${timeoutMs}ms 以内に起動しませんでした`);
}

before(async () => {
  serverProcess = spawn('npx', ['next', 'start', '-p', PORT], {
    stdio: 'pipe',
  });
  await waitForServer(BASE_URL);
});

after(() => {
  if (serverProcess) serverProcess.kill();
});

const pages = [
  { path: '/', mustInclude: ['勘定科目練習問題', '5要素のポジション問題'] },
  { path: '/modeSelectionPage', mustInclude: ['ゲームモードを選択', '無制限モード'] },
  { path: '/quiz1', mustInclude: ['Loading...'] },
  { path: '/quiz2', mustInclude: ['Loading...'] },
  { path: '/quiz3', mustInclude: ['Loading...'] },
  { path: '/quiz4', mustInclude: ['Loading...'] },
  { path: '/quiz5', mustInclude: ['Loading...'] },
];

for (const { path, mustInclude } of pages) {
  test(`${path} が正常に表示される`, async () => {
    const res = await fetch(`${BASE_URL}${path}`);
    assert.equal(res.status, 200, `${path} は200を返すべき`);
    const html = await res.text();
    for (const text of mustInclude) {
      assert.ok(
        html.includes(text),
        `${path} のHTMLに "${text}" が含まれているべき`
      );
    }
  });
}
