function messageGeneral(res, status, data, message, error = null) {
  return res.status(status).json({ ok: status < 400, message, data, error });
}
module.exports = { messageGeneral };
