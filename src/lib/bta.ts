// Thanks to https://gist.github.com/oeon/0ada0457194ebf70ec2428900ba76255 for the code!
const b2a = (a) => {
	var c,
		d,
		e,
		f,
		g,
		h,
		i,
		j,
		o,
		b = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",
		k = 0,
		l = 0,
		m = "",
		n = [];
	if (!a) return a;
	do
		(c = a.charCodeAt(k++)),
			(d = a.charCodeAt(k++)),
			(e = a.charCodeAt(k++)),
			(j = (c << 16) | (d << 8) | e),
			(f = 63 & (j >> 18)),
			(g = 63 & (j >> 12)),
			(h = 63 & (j >> 6)),
			(i = 63 & j),
			(n[l++] = b.charAt(f) + b.charAt(g) + b.charAt(h) + b.charAt(i));
	while (k < a.length);
	return (
		(m = n.join("")),
		(o = a.length % 3),
		(o ? m.slice(0, o - 3) : m) + "===".slice(o || 3)
	);
};
export default b2a;
