function getIndex(req, res) {
  const message = req.session.message || null;
  req.session.message = null;
  res.render("index", { message });
}

function getBrand(req, res) {
  res.render("brand");
}

function getDenim (req, res) {
  res.render("denim");
}

function getEp1(req, res) {
  res.render("episode1");
}

function getEp2(req, res) {
  res.render("episode2");
}

function getEp3(req, res) {
  res.render("episode3");
}

function getStockist(req, res) {
  res.render("stockist");
}

// function addClothes (req, res) {
//   res.render("addclothes");
// }
    
// function getAbout (req, res) {
//   res.render("about");
// }

module.exports = {
    getIndex,
    getBrand,
    getDenim,
    getEp1,
    getEp2,
    getEp3,
    getStockist
};
