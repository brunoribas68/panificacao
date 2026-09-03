import test from 'node:test';
import assert from 'node:assert/strict';
import {
  clampGrams,
  parseNonNegativeDecimal,
  parseNonNegativeInteger,
  sanitizeDecimalInput,
  sanitizeIntegerInput,
} from './numberInput.js';

test('sanitizeDecimalInput mantém apenas número e um separador decimal', () => {
  assert.equal(sanitizeDecimalInput('12,3a.4'), '12.34');
});

test('sanitizeIntegerInput remove caracteres não numéricos', () => {
  assert.equal(sanitizeIntegerInput('10a2b'), '102');
});

test('parseNonNegativeDecimal valida números decimais', () => {
  assert.equal(parseNonNegativeDecimal('12.5'), 12.5);
  assert.equal(parseNonNegativeDecimal('-1'), null);
  assert.equal(parseNonNegativeDecimal(''), null);
});

test('parseNonNegativeInteger valida inteiros não negativos', () => {
  assert.equal(parseNonNegativeInteger('12'), 12);
  assert.equal(parseNonNegativeInteger('12.1'), null);
  assert.equal(parseNonNegativeInteger('-2'), null);
});

test('clampGrams limita valores acima do máximo', () => {
  assert.equal(clampGrams(1000001), 1000000);
  assert.equal(clampGrams(250), 250);
});
