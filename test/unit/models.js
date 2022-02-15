const sinon = require('sinon');
const { expect } = require('chai');

// Requires from project
const { productModel, saleModel } = require('../../models');
const connection = require('../../models/connection');

describe('Models test', () => {
  describe('Test Product Model', () => {
    describe('Create Product', () => {
      describe('If were created successfully', () => {
        const payload = {
          id: 1,
          name: 'Cellphone',
          quantity: 12,
        }
        
        before(() => {
          sinon.stub(connection, 'query').resolves([{insertId: 1}]);
        });
  
        after(() => {
          connection.query.restore();
        });
  
        it('Returning an object', async () => {
          const result = await productModel.create('Cellphone', 12);
  
          expect(result).to.be.an('object');
        });
        it('Has all keys', async () => {
          const result = await productModel.create();
  
          expect(result).to.have.all.keys(payload);
        });
      })
    });
  
    describe('Getting all products', () => {
      describe('If there is no products', () => {
        before(() => {
          sinon.stub(connection, 'query').resolves([[]]);
        });
  
        after(() => {
          connection.query.restore();
        });
  
        it('Returning an array', async () => {
          const result = await productModel.getAll();
  
          expect(result).to.be.an('array');
        });
        it('Array is empty', async () => {
          const result = await productModel.getAll();
  
          expect(result).to.be.empty;
        });
      })
    });
  
    describe('Getting product by id', () => {
      describe('If there is no products', () => {
        before(() => {
          sinon.stub(connection, 'query').resolves([[]]);
        });
  
        after(() => {
          connection.query.restore();
        });
  
        it('Should be undefined', async () => {
          const result = await productModel.getById();
  
          expect(result).to.be.undefined;
        });
      })
    });
  
    describe('Updating product by id', () => {
      describe('Product updated', () => {
        const payload = {
          id: 1,
          name: 'Cellphone',
          quantity: 12,
        }
  
        before(() => {
          sinon.stub(connection, 'query').resolves();
        });
  
        after(() => {
          connection.query.restore();
        });
  
        it('Function returns a object', async () => {
          const result = await productModel.update(1, 'Cellphone', 12);
          expect(result).to.be.an('object');
        });
        it('Function has all keys', async () => {
          const result = await productModel.update(1, 'Cellphone', 12);
          expect(result).to.have.all.keys(payload);
        });
      })
    });
  
    describe('Remove product by id', () => {
      describe('Product removed', () => {
        before(() => {
          sinon.stub(connection, 'query').resolves();
        });
  
        after(() => {
          connection.query.restore();
        });
  
        it('Function returns undefined', async () => {
          const result = await productModel.remove(1);
          expect(result).to.be.undefined;
        });
      })
    });
  
    describe('Getting quantity by id', () => {
      describe('Received quantity', () => {
        before(() => {
          sinon.stub(connection, 'query').resolves([[{ quantity: 2 }]]);
        });
  
        after(() => {
          connection.query.restore();
        });
  
        it('Quantity returned', async () => {
          const result = await productModel.getQuant();
  
          expect(result).to.deep.equal(2);
        });
      })
    });
  
    describe('Update quantity', () => {
      describe('Quantity updated', () => {
        before(() => {
          sinon.stub(connection, 'query').resolves();
        });
  
        after(() => {
          connection.query.restore();
        });
  
        it('Function returns undefined', async () => {
          const result = await productModel.updateQuant(1, 2);
          expect(result).to.be.undefined;
        });
      })
    });
  });
  
  describe('Test Sale Model', () => {
    describe('Create Sale', () => {
      describe('If were created successfully', () => {
        const payload = [
          {
            "product_id": 1,
            "quantity": 2,
          },
        ];
        
        before(() => {
          sinon.stub(connection, 'query').resolves([{insertId: 1}]);
          sinon.stub(connection, 'execute').resolves();
        });
  
        after(() => {
          connection.query.restore();
          connection.execute.restore();
        });
  
        it('Returning the sale id', async () => {
          const result = await saleModel.create(payload);
  
          expect(result).to.deep.equal(1);
        });
      })
    });
  
    describe('Getting all sales', () => {
      describe('If there is no sale', () => {
        before(() => {
          sinon.stub(connection, 'query').resolves([[]]);
        });
  
        after(() => {
          connection.query.restore();
        });
  
        it('Returning an array', async () => {
          const result = await saleModel.getAll();
  
          expect(result).to.be.an('array');
        });
        it('Array is empty', async () => {
          const result = await saleModel.getAll();
  
          expect(result).to.be.empty;
        });
      })
    });
  
    describe('Getting sale by id', () => {
      describe('If there is no sale', () => {
        before(() => {
          sinon.stub(connection, 'query').resolves([]);
        });
  
        after(() => {
          connection.query.restore();
        });
  
        it('Should be undefined', async () => {
          const result = await saleModel.getById();
  
          expect(result).to.be.undefined;
        });
      })
    });
  
    describe('Updating sale by id', () => {
      describe('Sale updated', () => {
        before(() => {
          sinon.stub(connection, 'query').resolves();
        });
  
        after(() => {
          connection.query.restore();
        });
  
        it('Function returns nothing', async () => {
          const result = await saleModel.update(1, 2, 3);
          expect(result).to.be.undefined;
        });
      })
    });
  
    describe('Removing sale by id', () => {
      describe('Sale removed', () => {
        before(() => {
          sinon.stub(connection, 'query').resolves();
        });
  
        after(() => {
          connection.query.restore();
        });
  
        it('Function returns nothing', async () => {
          const result = await saleModel.remove(1);
          expect(result).to.be.undefined;
        });
      })
    });
  });
});
