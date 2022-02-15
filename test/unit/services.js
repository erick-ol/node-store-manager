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
    describe('Creating a product', () => {
      describe('If quantity on stock less than sold', () => {
        const payloadCreate = [{
          product_id: 1,
          quantity: 5,
        }];
        before(() => {
          sinon.stub(productService, 'getQuant').resolves(2);
        });
  
        after(() => {
          productService.getQuant.restore();
        });

        it('Returns false', async () => {
          const result = await saleService.create(payloadCreate);
          expect(result).to.be.false;
        });
      });
      describe('Sale created', () => {
        const payloadCreate = [{
          product_id: 1,
          quantity: 2,
        }];
        before(() => {
          sinon.stub(productService, 'getQuant').resolves(3);
          sinon.stub(saleModel, 'create').resolves(1);
          sinon.stub(productService, 'getById').resolves({ quantity: 2 });
          sinon.stub(productService, 'updateQuant').resolves();
        });
  
        after(() => {
          saleModel.create.restore();
          productService.getById.restore();
          productService.getQuant.restore();
          productService.updateQuant.restore();
        });

        it('Returns saleId', async () => {
          const result = await saleService.create(payloadCreate);
          expect(result).to.be.equal(1);
        });
      });
    });

    describe('Getting all sales', () => {
      const payload = [
        {
          "saleId": 1,
          "date": "2021-09-09T04:54:29.000Z",
          "product_id": 1,
          "quantity": 2
        },
        {
          "saleId": 1,
          "date": "2021-09-09T04:54:54.000Z",
          "product_id": 2,
          "quantity": 2
        }
      ];
      before(() => {
        sinon.stub(saleModel, 'getAll').resolves(payload);
      });

      after(() => {
        saleModel.getAll.restore();
      });

      it('Returns all sales', async () => {
        const result = await saleService.getAll();
        expect(result).to.be.equal(payload);
      });
    });

    describe('Get sale by id', () => {
      const payload = [
        { 
          "date": "2021-09-09T04:54:29.000Z",
          "product_id": 1,
          "quantity": 2
        },
        {
          "date": "2021-09-09T04:54:54.000Z",
          "product_id": 2,
          "quantity": 2
        }
      ];
      before(() => {
        sinon.stub(saleModel, 'getById').resolves(payload);
      });

      after(() => {
        saleModel.getById.restore();
      });

      it('Returns correct sale', async () => {
        const result = await saleService.getById(1);
        expect(result).to.be.equal(payload);
      });
    });

    describe('Updating sale', () => {
      before(() => {
        sinon.stub(saleModel, 'update').resolves(undefined);
      });

      after(() => {
        saleModel.update.restore();
      });

      it('Returns correct sale', async () => {
        const result = await saleService.update(1, 3, 2);
        expect(result).to.be.undefined;
      });
    });

    describe('Removing sale', () => {
      describe('If there is no sale with that id', () => {
        before(() => {
          sinon.stub(saleModel, 'getById').resolves([]);
        });
  
        after(() => {
          saleModel.getById.restore();
        });
  
        it('Returns correct sale', async () => {
          const result = await saleService.remove(5);
          expect(result).to.be.null;
        });
      });

      describe('Sale removed', () => {
        const payload = [
          {
            "date": "2021-09-09T04:54:29.000Z",
            "product_id": 1,
            "quantity": 2
          },
          {
            "date": "2021-09-09T04:54:54.000Z",
            "product_id": 2,
            "quantity": 2
          }
        ];

        before(() => {
          sinon.stub(saleModel, 'getById').resolves(payload);
          sinon.stub(saleModel, 'remove').resolves();
          sinon.stub(productService, 'getById').resolves({ quantity: 2 });
          sinon.stub(productService, 'updateQuant').resolves();
        });
  
        after(() => {
          saleModel.getById.restore();
          saleModel.remove.restore();
          productService.getById.restore();
          productService.updateQuant.restore();
        });
  
        it('Removed Successfully', async () => {
          const result = await saleService.remove(1);
          expect(result).to.be.equal(payload);
        });
      });
    });
  });
});