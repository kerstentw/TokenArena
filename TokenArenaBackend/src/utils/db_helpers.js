module.exports.update_array_object = function(_base_array, _append_array) {
    for (let i = 0; i < _append_array.length; i++){
      // Extracts Object
      update = _append_array[i]
    }

}

module.exports.divide_and_stash_cmc_data = (_data_struct, db_handler) => {
    var base_data_array = _data_struct.data
    console.log("BASE_DATA ", base_data_array)
    for (let i = 0; i < base_data_array.length; i++){
      var price_obj = new Object()
      let abbr = base_data_array[i].symbol
      let price_info = base_data_array[i].quote.USD
      price_info["symbol"] = abbr

      db_handler(price_info)
    }
}
