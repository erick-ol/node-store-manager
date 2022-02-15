const sinon = require('sinon');
const { expect } = require('chai');

// Requires from project
const { productModel, saleModel } = require('../../models');
const { productService, saleService } = require('../../services');

describe('Services test', () => {
  describe('Test Product Service', () => {
    describe('Creating a Product', () => {
      describe('If already exist a product with the same name', () => {
        before(() => {
          sinon.stub(productModel, 'getAll').resolves([{name: 'Cellphone'}]);
        });
  
        after(() => {
          productModel.getAll.restore();
        });

        it('Returns null', async () => {
          const result = await productService.create('Cellphone', 2);
          expect(result).to.be.null;
        });
      });
    });
  });

  describe('Sales Service', () => {

  });
});