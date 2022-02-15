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

      describe('New product created', () => {
        const payload = {
          id: 1,
          name: 'Computer',
          quantity: 10,
        };
        before(() => {
          sinon.stub(productModel, 'getAll').resolves([{name: 'Cellphone'}]);
          sinon.stub(productModel, 'create').resolves(payload);
        });
  
        after(() => {
          productModel.getAll.restore();
          productModel.create.restore();
        });

        it('Is a object', async () => {
          const result = await productService.create('Computer', 2);
          expect(result).to.be.an('object');
        });
        it('Returns all keys', async () => {
          const result = await productService.create('Computer', 2);
          expect(result).to.be.equal(payload);
        });
      });
    });

    describe('Getting all products', () => {
      const payload = [{
        id: 1,
        name: 'Computer',
        quantity: 10,
      }];
      before(() => {
        sinon.stub(productModel, 'getAll').resolves(payload);
      });

      after(() => {
        productModel.getAll.restore();
      });

      it('Returns all products', async () => {
        const result = await productService.getAll();
        expect(result).to.be.equal(payload);
      });
    });

    describe('Getting product by id', () => {
      const payload = {
        "id": 1,
        "name": "Smartphone",
        "quantity": 10
      };
      before(() => {
        sinon.stub(productModel, 'getById').resolves(payload);
      });

      after(() => {
        productModel.getById.restore();
      });

      it('Returns the product', async () => {
        const result = await productService.getById(1);
        expect(result).to.be.equal(payload);
      });
    });

    describe('Getting quantity', () => {
      before(() => {
        sinon.stub(productModel, 'getQuant').resolves(2);
      });

      after(() => {
        productModel.getQuant.restore();
      });

      it('Returns the quantity', async () => {
        const result = await productService.getQuant(1);
        expect(result).to.be.equal(2);
      });
    });

    describe('Updating quantity', () => {
      before(() => {
        sinon.stub(productModel, 'updateQuant').resolves();
      });

      after(() => {
        productModel.updateQuant.restore();
      });

      it('Returns the quantity', async () => {
        const result = await productService.updateQuant(1, 2);
        expect(result).to.be.undefined;
      });
    });

    describe('Updating product', () => {
      describe('If does not exist a product with the id', () => {
        before(() => {
          sinon.stub(productModel, 'getById').resolves(undefined);
        });
  
        after(() => {
          productModel.getById.restore();
        });
  
        it('Returns null', async () => {
          const result = await productService.update(3, 'Cellphone', 2);
          expect(result).to.be.null;
        });
      });

      describe('Product updated', () => {
        const payload = {
          id: 1,
          name: 'Cellphone',
          quantity: 10
        };
        before(() => {
          sinon.stub(productModel, 'getById').resolves(true);
          sinon.stub(productModel, 'update').resolves(payload);
        });
  
        after(() => {
          productModel.getById.restore();
          productModel.update.restore();
        });
  
        it('Updated Successfully', async () => {
          const result = await productService.update(payload);
          expect(result).to.be.equal(payload);
        });
      });
    });

    describe('Removing product', () => {
      describe('If does not exist a product with the id', () => {
        before(() => {
          sinon.stub(productModel, 'getById').resolves(undefined);
        });
  
        after(() => {
          productModel.getById.restore();
        });
  
        it('Returns null', async () => {
          const result = await productService.remove(3);
          expect(result).to.be.null;
        });
      });

      describe('Product removed', () => {
        const payload = {
          id: 1,
          name: 'Cellphone',
          quantity: 10
        };
        before(() => {
          sinon.stub(productModel, 'getById').resolves(payload);
          sinon.stub(productModel, 'remove').resolves();
        });
  
        after(() => {
          productModel.getById.restore();
          productModel.remove.restore();
        });
  
        it('Removed Successfully', async () => {
          const result = await productService.remove(3);
          expect(result).to.be.equal(payload);
        });
      });
    });
  });

  describe('Test Sale Service', () => {

  });
});