require('dotenv').config();
const sinon = require('sinon');
const { expect } = require('chai');
const connection = require('../../models/connection');
const {
  getAllProducts,
  createProduct,
  getProductById,
  deleteProduct,
  updateProduct,
  createSale,
  allSales,
} = require('../../services');


describe('Testing services', () => {
  beforeEach(async () => {
    sinon.stub(connection, 'execute').resolves();
  });

  afterEach(async () => connection.execute.restore());
  
  describe('Testing add product', () => {
    it('Is an object', async () => {
      const response = await createProduct('Monitor', 2);

      expect(response).to.be.an('object');
    });
  });

  describe('Testing getting all products', () => {
    it('Array returned', async () => {
      const response = await getAllProducts();

      expect(response).to.be.an('array');
    });
  });

  describe('Testing getting product by id', () => {
    it('Is an object', async () => {
      const prod = await createProduct('Cellphone', 2);
      const response = await getProductById(prod.id);

      expect(response).to.be.an('object');
    });
  });

  describe('Testing deleting product', () => {
    it('Deleted object', async () => {
      const prod = await createProduct('Computer', 2);

      await deleteProduct(prod.id);
      const result = await getAllProducts();
      expect(result).to.not.include(prod);
    });
  });

  describe('Testing updating product', () => {
    it('Product updated', async () => {
      const prod = await createProduct('Echo dot', 2);
      await updateProduct(prod.id, 'Alexa Echo Dot', 3);
      
      const updated = await getProductById(prod.id);
      expect(updated).to.deep.include({id: prod.id, name: 'Alexa Echo Dot', quantity: 3});
    });
  });

  describe('Testing add sale', async () => {
    it('Sale added', async () => {
      const prod = await createProduct('Pendrive 8gb', 2);
      const sale = await createSale([{ product_id: prod.id, quantity: 1 }]);

      expect(sale).to.be.a('number');
    });
  });

  describe('Testing getting all sales', async () => {
    it('Returning all sales', async () => {
      const prod = await createProduct('Bluetooth speaker', 2);
      const sale = await createSale([{ product_id: prod.id, quantity: 1 }]);
      const sales = await allSales();

      expect(sales).to.be.an('array');
      expect(sales[sales.length - 1]).to.include({saleId: sale});
    });
  });
});
