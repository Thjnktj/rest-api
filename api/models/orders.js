const mongoose = require('mongoose');

const orderSchema = mongoose.Schema({
    product: { type: mongoose.Types.ObjectId, ref: 'Product', required: true},
    quantity: { type: Number, default: 1 }
});

orderSchema.statics = {
    postOrder: function (item) {
        return this.create(item);
    },
    findOrderById: function (id) {
        return this.findById(id);
    },
    deleteOrder: function (id) {
        return this.remove({ _id: id });
    }
}

module.exports = mongoose.model('Order', orderSchema);