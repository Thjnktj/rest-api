const mongoose = require('mongoose');

const productSchema = mongoose.Schema({
    name: String,
    price: Number,
    productImage: String
});

productSchema.statics = {
    getAll: function () {
        return this.find().lean();
    },
    findProduct: function (id) {
        return this.findById(id);
    },
    updateProduct: function (id, item) {
        return this.update({ _id: id }, { $set: item });
    },
    deleteProduct: function (id) {
        return this.remove({ _id: id });
    }
}

module.exports = mongoose.model('Product', productSchema);