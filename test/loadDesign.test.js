const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const test = require('node:test');
const vm = require('node:vm');
const ts = require('typescript');
const { compileScript, parse } = require('vue/compiler-sfc');

function getSerializedEditorFactory() {
  const filename = path.resolve(__dirname, '../src/components/EmailEditor.vue');
  const source = fs.readFileSync(filename, 'utf8');
  const descriptor = parse(source, { filename }).descriptor;
  const compiled = compileScript(descriptor, { id: 'email-editor-test' });
  const output = ts.transpileModule(compiled.content, {
    compilerOptions: {
      module: ts.ModuleKind.CommonJS,
      target: ts.ScriptTarget.ES2020,
    },
  }).outputText;
  const module = { exports: {} };

  vm.runInNewContext(output, {
    module,
    exports: module.exports,
    require(request) {
      if (request === 'vue') return require('vue');
      if (request === '../../package.json') {
        return require(path.resolve(__dirname, '../package.json'));
      }
      if (request === './loadScript') return { loadScript: () => {} };
      if (request === './types') return {};
      throw new Error(`Unexpected module: ${request}`);
    },
  });

  return module.exports.default.setup({}, {}).createSerializedEditor;
}

test('loads an empty object as a blank design through the editor proxy', () => {
  const calls = [];
  const editor = {
    loadBlank: () => calls.push(['loadBlank']),
    loadDesign: (design) => calls.push(['loadDesign', design]),
  };

  const serializedEditor = getSerializedEditorFactory()(editor);
  serializedEditor.loadDesign({});

  assert.deepEqual(calls, [['loadBlank']]);
});

test('passes valid designs through the editor proxy unchanged', () => {
  const calls = [];
  const design = { counters: {}, body: { rows: [] } };
  const editor = {
    loadBlank: () => calls.push(['loadBlank']),
    loadDesign(receivedDesign) {
      calls.push(['loadDesign', this, receivedDesign]);
    },
    saveDesign: () => calls.push(['saveDesign']),
  };

  const serializedEditor = getSerializedEditorFactory()(editor);
  serializedEditor.loadDesign(design);

  assert.deepEqual(calls, [['loadDesign', editor, design]]);
  assert.strictEqual(serializedEditor.saveDesign, editor.saveDesign);
  assert.strictEqual(serializedEditor.loadBlank, editor.loadBlank);
});

test('forwards null and undefined to the original method', () => {
  const calls = [];
  const editor = {
    loadBlank: () => calls.push(['loadBlank']),
    loadDesign(receivedDesign) {
      calls.push(receivedDesign);
    },
  };

  const serializedEditor = getSerializedEditorFactory()(editor);
  serializedEditor.loadDesign(null);
  serializedEditor.loadDesign(undefined);

  assert.deepEqual(calls, [null, undefined]);
});