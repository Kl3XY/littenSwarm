var Mp = Object.defineProperty,
    _p = Object.defineProperties;
var Tp = Object.getOwnPropertyDescriptors;
var wc = Object.getOwnPropertySymbols;
var Np = Object.prototype.hasOwnProperty,
    xp = Object.prototype.propertyIsEnumerable;
var Ec = (e, t, n) => t in e ? Mp(e, t, {
        enumerable: !0,
        configurable: !0,
        writable: !0,
        value: n
    }) : e[t] = n,
    m = (e, t) => {
        for (var n in t ||= {}) Np.call(t, n) && Ec(e, n, t[n]);
        if (wc)
            for (var n of wc(t)) xp.call(t, n) && Ec(e, n, t[n]);
        return e
    },
    O = (e, t) => _p(e, Tp(t));

function Cc(e, t) {
    return Object.is(e, t)
}
var U = null,
    ar = !1,
    ui = 1,
    Et = Symbol("SIGNAL");

function T(e) {
    let t = U;
    return U = e, t
}

function li() {
    return U
}
var cr = {
    version: 0,
    lastCleanEpoch: 0,
    dirty: !1,
    producerNode: void 0,
    producerLastReadVersion: void 0,
    producerIndexOfThis: void 0,
    nextProducerIndex: 0,
    liveConsumerNode: void 0,
    liveConsumerIndexOfThis: void 0,
    consumerAllowSignalWrites: !1,
    consumerIsAlwaysLive: !1,
    kind: "unknown",
    producerMustRecompute: () => !1,
    producerRecomputeValue: () => {},
    consumerMarkedDirty: () => {},
    consumerOnSignalRead: () => {}
};

function di(e) {
    if (ar) throw new Error("");
    if (U === null) return;
    U.consumerOnSignalRead(e);
    let t = U.nextProducerIndex++;
    if (lr(U), t < U.producerNode.length && U.producerNode[t] !== e && un(U)) {
        let n = U.producerNode[t];
        ur(n, U.producerIndexOfThis[t])
    }
    U.producerNode[t] !== e && (U.producerNode[t] = e, U.producerIndexOfThis[t] = un(U) ? _c(e, U, t) : 0), U.producerLastReadVersion[t] = e.version
}

function Ic() {
    ui++
}

function bc(e) {
    if (!(un(e) && !e.dirty) && !(!e.dirty && e.lastCleanEpoch === ui)) {
        if (!e.producerMustRecompute(e) && !hi(e)) {
            ci(e);
            return
        }
        e.producerRecomputeValue(e), ci(e)
    }
}

function fi(e) {
    if (e.liveConsumerNode === void 0) return;
    let t = ar;
    ar = !0;
    try {
        for (let n of e.liveConsumerNode) n.dirty || Rp(n)
    } finally {
        ar = t
    }
}

function Sc() {
    return U?.consumerAllowSignalWrites !== !1
}

function Rp(e) {
    e.dirty = !0, fi(e), e.consumerMarkedDirty?.(e)
}

function ci(e) {
    e.dirty = !1, e.lastCleanEpoch = ui
}

function pi(e) {
    return e && (e.nextProducerIndex = 0), T(e)
}

function Mc(e, t) {
    if (T(t), !(!e || e.producerNode === void 0 || e.producerIndexOfThis === void 0 || e.producerLastReadVersion === void 0)) {
        if (un(e))
            for (let n = e.nextProducerIndex; n < e.producerNode.length; n++) ur(e.producerNode[n], e.producerIndexOfThis[n]);
        for (; e.producerNode.length > e.nextProducerIndex;) e.producerNode.pop(), e.producerLastReadVersion.pop(), e.producerIndexOfThis.pop()
    }
}

function hi(e) {
    lr(e);
    for (let t = 0; t < e.producerNode.length; t++) {
        let n = e.producerNode[t],
            r = e.producerLastReadVersion[t];
        if (r !== n.version || (bc(n), r !== n.version)) return !0
    }
    return !1
}

function gi(e) {
    if (lr(e), un(e))
        for (let t = 0; t < e.producerNode.length; t++) ur(e.producerNode[t], e.producerIndexOfThis[t]);
    e.producerNode.length = e.producerLastReadVersion.length = e.producerIndexOfThis.length = 0, e.liveConsumerNode && (e.liveConsumerNode.length = e.liveConsumerIndexOfThis.length = 0)
}

function _c(e, t, n) {
    if (Tc(e), e.liveConsumerNode.length === 0 && Nc(e))
        for (let r = 0; r < e.producerNode.length; r++) e.producerIndexOfThis[r] = _c(e.producerNode[r], e, r);
    return e.liveConsumerIndexOfThis.push(n), e.liveConsumerNode.push(t) - 1
}

function ur(e, t) {
    if (Tc(e), e.liveConsumerNode.length === 1 && Nc(e))
        for (let r = 0; r < e.producerNode.length; r++) ur(e.producerNode[r], e.producerIndexOfThis[r]);
    let n = e.liveConsumerNode.length - 1;
    if (e.liveConsumerNode[t] = e.liveConsumerNode[n], e.liveConsumerIndexOfThis[t] = e.liveConsumerIndexOfThis[n], e.liveConsumerNode.length--, e.liveConsumerIndexOfThis.length--, t < e.liveConsumerNode.length) {
        let r = e.liveConsumerIndexOfThis[t],
            o = e.liveConsumerNode[t];
        lr(o), o.producerIndexOfThis[r] = t
    }
}

function un(e) {
    return e.consumerIsAlwaysLive || (e?.liveConsumerNode?.length ?? 0) > 0
}

function lr(e) {
    e.producerNode ??= [], e.producerIndexOfThis ??= [], e.producerLastReadVersion ??= []
}

function Tc(e) {
    e.liveConsumerNode ??= [], e.liveConsumerIndexOfThis ??= []
}

function Nc(e) {
    return e.producerNode !== void 0
}

function Ap() {
    throw new Error
}
var xc = Ap;

function Op(e) {
    xc(e)
}

function mi(e) {
    xc = e
}
var kp = null;

function vi(e, t) {
    Sc() || Op(e), e.equal(e.value, t) || (e.value = t, Pp(e))
}
var yi = O(m({}, cr), {
    equal: Cc,
    value: void 0,
    kind: "signal"
});

function Pp(e) {
    e.version++, Ic(), fi(e), kp?.()
}
var Di;

function ln() {
    return Di
}

function Te(e) {
    let t = Di;
    return Di = e, t
}
var dr = Symbol("NotFound");

function E(e) {
    return typeof e == "function"
}

function Ct(e) {
    let n = e(r => {
        Error.call(r), r.stack = new Error().stack
    });
    return n.prototype = Object.create(Error.prototype), n.prototype.constructor = n, n
}
var fr = Ct(e => function(n) {
    e(this), this.message = n ? `${n.length} errors occurred during unsubscription:
${n.map((r,o)=>`${o+1}) ${r.toString()}`).join(`
  `)}` : "", this.name = "UnsubscriptionError", this.errors = n
});

function dn(e, t) {
    if (e) {
        let n = e.indexOf(t);
        0 <= n && e.splice(n, 1)
    }
}
var $ = class e {
    constructor(t) {
        this.initialTeardown = t, this.closed = !1, this._parentage = null, this._finalizers = null
    }
    unsubscribe() {
        let t;
        if (!this.closed) {
            this.closed = !0;
            let {
                _parentage: n
            } = this;
            if (n)
                if (this._parentage = null, Array.isArray(n))
                    for (let i of n) i.remove(this);
                else n.remove(this);
            let {
                initialTeardown: r
            } = this;
            if (E(r)) try {
                r()
            } catch (i) {
                t = i instanceof fr ? i.errors : [i]
            }
            let {
                _finalizers: o
            } = this;
            if (o) {
                this._finalizers = null;
                for (let i of o) try {
                    Rc(i)
                } catch (s) {
                    t = t ?? [], s instanceof fr ? t = [...t, ...s.errors] : t.push(s)
                }
            }
            if (t) throw new fr(t)
        }
    }
    add(t) {
        var n;
        if (t && t !== this)
            if (this.closed) Rc(t);
            else {
                if (t instanceof e) {
                    if (t.closed || t._hasParent(this)) return;
                    t._addParent(this)
                }(this._finalizers = (n = this._finalizers) !== null && n !== void 0 ? n : []).push(t)
            }
    }
    _hasParent(t) {
        let {
            _parentage: n
        } = this;
        return n === t || Array.isArray(n) && n.includes(t)
    }
    _addParent(t) {
        let {
            _parentage: n
        } = this;
        this._parentage = Array.isArray(n) ? (n.push(t), n) : n ? [n, t] : t
    }
    _removeParent(t) {
        let {
            _parentage: n
        } = this;
        n === t ? this._parentage = null : Array.isArray(n) && dn(n, t)
    }
    remove(t) {
        let {
            _finalizers: n
        } = this;
        n && dn(n, t), t instanceof e && t._removeParent(this)
    }
};
$.EMPTY = (() => {
    let e = new $;
    return e.closed = !0, e
})();
var wi = $.EMPTY;

function pr(e) {
    return e instanceof $ || e && "closed" in e && E(e.remove) && E(e.add) && E(e.unsubscribe)
}

function Rc(e) {
    E(e) ? e() : e.unsubscribe()
}
var he = {
    onUnhandledError: null,
    onStoppedNotification: null,
    Promise: void 0,
    useDeprecatedSynchronousErrorHandling: !1,
    useDeprecatedNextContext: !1
};
var It = {
    setTimeout(e, t, ...n) {
        let {
            delegate: r
        } = It;
        return r?.setTimeout ? r.setTimeout(e, t, ...n) : setTimeout(e, t, ...n)
    },
    clearTimeout(e) {
        let {
            delegate: t
        } = It;
        return (t?.clearTimeout || clearTimeout)(e)
    },
    delegate: void 0
};

function hr(e) {
    It.setTimeout(() => {
        let {
            onUnhandledError: t
        } = he;
        if (t) t(e);
        else throw e
    })
}

function fn() {}
var Ac = Ei("C", void 0, void 0);

function Oc(e) {
    return Ei("E", void 0, e)
}

function kc(e) {
    return Ei("N", e, void 0)
}

function Ei(e, t, n) {
    return {
        kind: e,
        value: t,
        error: n
    }
}
var nt = null;

function bt(e) {
    if (he.useDeprecatedSynchronousErrorHandling) {
        let t = !nt;
        if (t && (nt = {
                errorThrown: !1,
                error: null
            }), e(), t) {
            let {
                errorThrown: n,
                error: r
            } = nt;
            if (nt = null, n) throw r
        }
    } else e()
}

function Pc(e) {
    he.useDeprecatedSynchronousErrorHandling && nt && (nt.errorThrown = !0, nt.error = e)
}
var rt = class extends $ {
        constructor(t) {
            super(), this.isStopped = !1, t ? (this.destination = t, pr(t) && t.add(this)) : this.destination = qp
        }
        static create(t, n, r) {
            return new St(t, n, r)
        }
        next(t) {
            this.isStopped ? Ii(kc(t), this) : this._next(t)
        }
        error(t) {
            this.isStopped ? Ii(Oc(t), this) : (this.isStopped = !0, this._error(t))
        }
        complete() {
            this.isStopped ? Ii(Ac, this) : (this.isStopped = !0, this._complete())
        }
        unsubscribe() {
            this.closed || (this.isStopped = !0, super.unsubscribe(), this.destination = null)
        }
        _next(t) {
            this.destination.next(t)
        }
        _error(t) {
            try {
                this.destination.error(t)
            } finally {
                this.unsubscribe()
            }
        }
        _complete() {
            try {
                this.destination.complete()
            } finally {
                this.unsubscribe()
            }
        }
    },
    Up = Function.prototype.bind;

function Ci(e, t) {
    return Up.call(e, t)
}
var bi = class {
        constructor(t) {
            this.partialObserver = t
        }
        next(t) {
            let {
                partialObserver: n
            } = this;
            if (n.next) try {
                n.next(t)
            } catch (r) {
                gr(r)
            }
        }
        error(t) {
            let {
                partialObserver: n
            } = this;
            if (n.error) try {
                n.error(t)
            } catch (r) {
                gr(r)
            } else gr(t)
        }
        complete() {
            let {
                partialObserver: t
            } = this;
            if (t.complete) try {
                t.complete()
            } catch (n) {
                gr(n)
            }
        }
    },
    St = class extends rt {
        constructor(t, n, r) {
            super();
            let o;
            if (E(t) || !t) o = {
                next: t ?? void 0,
                error: n ?? void 0,
                complete: r ?? void 0
            };
            else {
                let i;
                this && he.useDeprecatedNextContext ? (i = Object.create(t), i.unsubscribe = () => this.unsubscribe(), o = {
                    next: t.next && Ci(t.next, i),
                    error: t.error && Ci(t.error, i),
                    complete: t.complete && Ci(t.complete, i)
                }) : o = t
            }
            this.destination = new bi(o)
        }
    };

function gr(e) {
    he.useDeprecatedSynchronousErrorHandling ? Pc(e) : hr(e)
}

function zp(e) {
    throw e
}

function Ii(e, t) {
    let {
        onStoppedNotification: n
    } = he;
    n && It.setTimeout(() => n(e, t))
}
var qp = {
    closed: !0,
    next: fn,
    error: zp,
    complete: fn
};
var Mt = typeof Symbol == "function" && Symbol.observable || "@@observable";

function ie(e) {
    return e
}

function Si(...e) {
    return Mi(e)
}

function Mi(e) {
    return e.length === 0 ? ie : e.length === 1 ? e[0] : function(n) {
        return e.reduce((r, o) => o(r), n)
    }
}
var F = (() => {
    class e {
        constructor(n) {
            n && (this._subscribe = n)
        }
        lift(n) {
            let r = new e;
            return r.source = this, r.operator = n, r
        }
        subscribe(n, r, o) {
            let i = Wp(n) ? n : new St(n, r, o);
            return bt(() => {
                let {
                    operator: s,
                    source: a
                } = this;
                i.add(s ? s.call(i, a) : a ? this._subscribe(i) : this._trySubscribe(i))
            }), i
        }
        _trySubscribe(n) {
            try {
                return this._subscribe(n)
            } catch (r) {
                n.error(r)
            }
        }
        forEach(n, r) {
            return r = Fc(r), new r((o, i) => {
                let s = new St({
                    next: a => {
                        try {
                            n(a)
                        } catch (c) {
                            i(c), s.unsubscribe()
                        }
                    },
                    error: i,
                    complete: o
                });
                this.subscribe(s)
            })
        }
        _subscribe(n) {
            var r;
            return (r = this.source) === null || r === void 0 ? void 0 : r.subscribe(n)
        } [Mt]() {
            return this
        }
        pipe(...n) {
            return Mi(n)(this)
        }
        toPromise(n) {
            return n = Fc(n), new n((r, o) => {
                let i;
                this.subscribe(s => i = s, s => o(s), () => r(i))
            })
        }
    }
    return e.create = t => new e(t), e
})();

function Fc(e) {
    var t;
    return (t = e ?? he.Promise) !== null && t !== void 0 ? t : Promise
}

function Gp(e) {
    return e && E(e.next) && E(e.error) && E(e.complete)
}

function Wp(e) {
    return e && e instanceof rt || Gp(e) && pr(e)
}

function _i(e) {
    return E(e?.lift)
}

function N(e) {
    return t => {
        if (_i(t)) return t.lift(function(n) {
            try {
                return e(n, this)
            } catch (r) {
                this.error(r)
            }
        });
        throw new TypeError("Unable to lift unknown Observable type")
    }
}

function x(e, t, n, r, o) {
    return new Ti(e, t, n, r, o)
}
var Ti = class extends rt {
    constructor(t, n, r, o, i, s) {
        super(t), this.onFinalize = i, this.shouldUnsubscribe = s, this._next = n ? function(a) {
            try {
                n(a)
            } catch (c) {
                t.error(c)
            }
        } : super._next, this._error = o ? function(a) {
            try {
                o(a)
            } catch (c) {
                t.error(c)
            } finally {
                this.unsubscribe()
            }
        } : super._error, this._complete = r ? function() {
            try {
                r()
            } catch (a) {
                t.error(a)
            } finally {
                this.unsubscribe()
            }
        } : super._complete
    }
    unsubscribe() {
        var t;
        if (!this.shouldUnsubscribe || this.shouldUnsubscribe()) {
            let {
                closed: n
            } = this;
            super.unsubscribe(), !n && ((t = this.onFinalize) === null || t === void 0 || t.call(this))
        }
    }
};

function _t() {
    return N((e, t) => {
        let n = null;
        e._refCount++;
        let r = x(t, void 0, void 0, void 0, () => {
            if (!e || e._refCount <= 0 || 0 < --e._refCount) {
                n = null;
                return
            }
            let o = e._connection,
                i = n;
            n = null, o && (!i || o === i) && o.unsubscribe(), t.unsubscribe()
        });
        e.subscribe(r), r.closed || (n = e.connect())
    })
}
var Tt = class extends F {
    constructor(t, n) {
        super(), this.source = t, this.subjectFactory = n, this._subject = null, this._refCount = 0, this._connection = null, _i(t) && (this.lift = t.lift)
    }
    _subscribe(t) {
        return this.getSubject().subscribe(t)
    }
    getSubject() {
        let t = this._subject;
        return (!t || t.isStopped) && (this._subject = this.subjectFactory()), this._subject
    }
    _teardown() {
        this._refCount = 0;
        let {
            _connection: t
        } = this;
        this._subject = this._connection = null, t?.unsubscribe()
    }
    connect() {
        let t = this._connection;
        if (!t) {
            t = this._connection = new $;
            let n = this.getSubject();
            t.add(this.source.subscribe(x(n, void 0, () => {
                this._teardown(), n.complete()
            }, r => {
                this._teardown(), n.error(r)
            }, () => this._teardown()))), t.closed && (this._connection = null, t = $.EMPTY)
        }
        return t
    }
    refCount() {
        return _t()(this)
    }
};
var Lc = Ct(e => function() {
    e(this), this.name = "ObjectUnsubscribedError", this.message = "object unsubscribed"
});
var q = (() => {
        class e extends F {
            constructor() {
                super(), this.closed = !1, this.currentObservers = null, this.observers = [], this.isStopped = !1, this.hasError = !1, this.thrownError = null
            }
            lift(n) {
                let r = new mr(this, this);
                return r.operator = n, r
            }
            _throwIfClosed() {
                if (this.closed) throw new Lc
            }
            next(n) {
                bt(() => {
                    if (this._throwIfClosed(), !this.isStopped) {
                        this.currentObservers || (this.currentObservers = Array.from(this.observers));
                        for (let r of this.currentObservers) r.next(n)
                    }
                })
            }
            error(n) {
                bt(() => {
                    if (this._throwIfClosed(), !this.isStopped) {
                        this.hasError = this.isStopped = !0, this.thrownError = n;
                        let {
                            observers: r
                        } = this;
                        for (; r.length;) r.shift().error(n)
                    }
                })
            }
            complete() {
                bt(() => {
                    if (this._throwIfClosed(), !this.isStopped) {
                        this.isStopped = !0;
                        let {
                            observers: n
                        } = this;
                        for (; n.length;) n.shift().complete()
                    }
                })
            }
            unsubscribe() {
                this.isStopped = this.closed = !0, this.observers = this.currentObservers = null
            }
            get observed() {
                var n;
                return ((n = this.observers) === null || n === void 0 ? void 0 : n.length) > 0
            }
            _trySubscribe(n) {
                return this._throwIfClosed(), super._trySubscribe(n)
            }
            _subscribe(n) {
                return this._throwIfClosed(), this._checkFinalizedStatuses(n), this._innerSubscribe(n)
            }
            _innerSubscribe(n) {
                let {
                    hasError: r,
                    isStopped: o,
                    observers: i
                } = this;
                return r || o ? wi : (this.currentObservers = null, i.push(n), new $(() => {
                    this.currentObservers = null, dn(i, n)
                }))
            }
            _checkFinalizedStatuses(n) {
                let {
                    hasError: r,
                    thrownError: o,
                    isStopped: i
                } = this;
                r ? n.error(o) : i && n.complete()
            }
            asObservable() {
                let n = new F;
                return n.source = this, n
            }
        }
        return e.create = (t, n) => new mr(t, n), e
    })(),
    mr = class extends q {
        constructor(t, n) {
            super(), this.destination = t, this.source = n
        }
        next(t) {
            var n, r;
            (r = (n = this.destination) === null || n === void 0 ? void 0 : n.next) === null || r === void 0 || r.call(n, t)
        }
        error(t) {
            var n, r;
            (r = (n = this.destination) === null || n === void 0 ? void 0 : n.error) === null || r === void 0 || r.call(n, t)
        }
        complete() {
            var t, n;
            (n = (t = this.destination) === null || t === void 0 ? void 0 : t.complete) === null || n === void 0 || n.call(t)
        }
        _subscribe(t) {
            var n, r;
            return (r = (n = this.source) === null || n === void 0 ? void 0 : n.subscribe(t)) !== null && r !== void 0 ? r : wi
        }
    };
var Z = class extends q {
    constructor(t) {
        super(), this._value = t
    }
    get value() {
        return this.getValue()
    }
    _subscribe(t) {
        let n = super._subscribe(t);
        return !n.closed && t.next(this._value), n
    }
    getValue() {
        let {
            hasError: t,
            thrownError: n,
            _value: r
        } = this;
        if (t) throw n;
        return this._throwIfClosed(), r
    }
    next(t) {
        super.next(this._value = t)
    }
};
var te = new F(e => e.complete());

function jc(e) {
    return e && E(e.schedule)
}

function Vc(e) {
    return e[e.length - 1]
}

function Bc(e) {
    return E(Vc(e)) ? e.pop() : void 0
}

function Ge(e) {
    return jc(Vc(e)) ? e.pop() : void 0
}

function Hc(e, t, n, r) {
    function o(i) {
        return i instanceof n ? i : new n(function(s) {
            s(i)
        })
    }
    return new(n || (n = Promise))(function(i, s) {
        function a(l) {
            try {
                u(r.next(l))
            } catch (f) {
                s(f)
            }
        }

        function c(l) {
            try {
                u(r.throw(l))
            } catch (f) {
                s(f)
            }
        }

        function u(l) {
            l.done ? i(l.value) : o(l.value).then(a, c)
        }
        u((r = r.apply(e, t || [])).next())
    })
}

function $c(e) {
    var t = typeof Symbol == "function" && Symbol.iterator,
        n = t && e[t],
        r = 0;
    if (n) return n.call(e);
    if (e && typeof e.length == "number") return {
        next: function() {
            return e && r >= e.length && (e = void 0), {
                value: e && e[r++],
                done: !e
            }
        }
    };
    throw new TypeError(t ? "Object is not iterable." : "Symbol.iterator is not defined.")
}

function ot(e) {
    return this instanceof ot ? (this.v = e, this) : new ot(e)
}

function Uc(e, t, n) {
    if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
    var r = n.apply(e, t || []),
        o, i = [];
    return o = Object.create((typeof AsyncIterator == "function" ? AsyncIterator : Object).prototype), a("next"), a("throw"), a("return", s), o[Symbol.asyncIterator] = function() {
        return this
    }, o;

    function s(d) {
        return function(h) {
            return Promise.resolve(h).then(d, f)
        }
    }

    function a(d, h) {
        r[d] && (o[d] = function(y) {
            return new Promise(function(P, j) {
                i.push([d, y, P, j]) > 1 || c(d, y)
            })
        }, h && (o[d] = h(o[d])))
    }

    function c(d, h) {
        try {
            u(r[d](h))
        } catch (y) {
            p(i[0][3], y)
        }
    }

    function u(d) {
        d.value instanceof ot ? Promise.resolve(d.value.v).then(l, f) : p(i[0][2], d)
    }

    function l(d) {
        c("next", d)
    }

    function f(d) {
        c("throw", d)
    }

    function p(d, h) {
        d(h), i.shift(), i.length && c(i[0][0], i[0][1])
    }
}

function zc(e) {
    if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
    var t = e[Symbol.asyncIterator],
        n;
    return t ? t.call(e) : (e = typeof $c == "function" ? $c(e) : e[Symbol.iterator](), n = {}, r("next"), r("throw"), r("return"), n[Symbol.asyncIterator] = function() {
        return this
    }, n);

    function r(i) {
        n[i] = e[i] && function(s) {
            return new Promise(function(a, c) {
                s = e[i](s), o(a, c, s.done, s.value)
            })
        }
    }

    function o(i, s, a, c) {
        Promise.resolve(c).then(function(u) {
            i({
                value: u,
                done: a
            })
        }, s)
    }
}
var vr = e => e && typeof e.length == "number" && typeof e != "function";

function yr(e) {
    return E(e?.then)
}

function Dr(e) {
    return E(e[Mt])
}

function wr(e) {
    return Symbol.asyncIterator && E(e?.[Symbol.asyncIterator])
}

function Er(e) {
    return new TypeError(`You provided ${e!==null&&typeof e=="object"?"an invalid object":`'${e}'`} where a stream was expected. You can provide an Observable, Promise, ReadableStream, Array, AsyncIterable, or Iterable.`)
}

function Zp() {
    return typeof Symbol != "function" || !Symbol.iterator ? "@@iterator" : Symbol.iterator
}
var Cr = Zp();

function Ir(e) {
    return E(e?.[Cr])
}

function br(e) {
    return Uc(this, arguments, function*() {
        let n = e.getReader();
        try {
            for (;;) {
                let {
                    value: r,
                    done: o
                } = yield ot(n.read());
                if (o) return yield ot(void 0);
                yield yield ot(r)
            }
        } finally {
            n.releaseLock()
        }
    })
}

function Sr(e) {
    return E(e?.getReader)
}

function G(e) {
    if (e instanceof F) return e;
    if (e != null) {
        if (Dr(e)) return Qp(e);
        if (vr(e)) return Yp(e);
        if (yr(e)) return Kp(e);
        if (wr(e)) return qc(e);
        if (Ir(e)) return Jp(e);
        if (Sr(e)) return Xp(e)
    }
    throw Er(e)
}

function Qp(e) {
    return new F(t => {
        let n = e[Mt]();
        if (E(n.subscribe)) return n.subscribe(t);
        throw new TypeError("Provided object does not correctly implement Symbol.observable")
    })
}

function Yp(e) {
    return new F(t => {
        for (let n = 0; n < e.length && !t.closed; n++) t.next(e[n]);
        t.complete()
    })
}

function Kp(e) {
    return new F(t => {
        e.then(n => {
            t.closed || (t.next(n), t.complete())
        }, n => t.error(n)).then(null, hr)
    })
}

function Jp(e) {
    return new F(t => {
        for (let n of e)
            if (t.next(n), t.closed) return;
        t.complete()
    })
}

function qc(e) {
    return new F(t => {
        eh(e, t).catch(n => t.error(n))
    })
}

function Xp(e) {
    return qc(br(e))
}

function eh(e, t) {
    var n, r, o, i;
    return Hc(this, void 0, void 0, function*() {
        try {
            for (n = zc(e); r = yield n.next(), !r.done;) {
                let s = r.value;
                if (t.next(s), t.closed) return
            }
        } catch (s) {
            o = {
                error: s
            }
        } finally {
            try {
                r && !r.done && (i = n.return) && (yield i.call(n))
            } finally {
                if (o) throw o.error
            }
        }
        t.complete()
    })
}

function ne(e, t, n, r = 0, o = !1) {
    let i = t.schedule(function() {
        n(), o ? e.add(this.schedule(null, r)) : this.unsubscribe()
    }, r);
    if (e.add(i), !o) return i
}

function Mr(e, t = 0) {
    return N((n, r) => {
        n.subscribe(x(r, o => ne(r, e, () => r.next(o), t), () => ne(r, e, () => r.complete(), t), o => ne(r, e, () => r.error(o), t)))
    })
}

function _r(e, t = 0) {
    return N((n, r) => {
        r.add(e.schedule(() => n.subscribe(r), t))
    })
}

function Gc(e, t) {
    return G(e).pipe(_r(t), Mr(t))
}

function Wc(e, t) {
    return G(e).pipe(_r(t), Mr(t))
}

function Zc(e, t) {
    return new F(n => {
        let r = 0;
        return t.schedule(function() {
            r === e.length ? n.complete() : (n.next(e[r++]), n.closed || this.schedule())
        })
    })
}

function Qc(e, t) {
    return new F(n => {
        let r;
        return ne(n, t, () => {
            r = e[Cr](), ne(n, t, () => {
                let o, i;
                try {
                    ({
                        value: o,
                        done: i
                    } = r.next())
                } catch (s) {
                    n.error(s);
                    return
                }
                i ? n.complete() : n.next(o)
            }, 0, !0)
        }), () => E(r?.return) && r.return()
    })
}

function Tr(e, t) {
    if (!e) throw new Error("Iterable cannot be null");
    return new F(n => {
        ne(n, t, () => {
            let r = e[Symbol.asyncIterator]();
            ne(n, t, () => {
                r.next().then(o => {
                    o.done ? n.complete() : n.next(o.value)
                })
            }, 0, !0)
        })
    })
}

function Yc(e, t) {
    return Tr(br(e), t)
}

function Kc(e, t) {
    if (e != null) {
        if (Dr(e)) return Gc(e, t);
        if (vr(e)) return Zc(e, t);
        if (yr(e)) return Wc(e, t);
        if (wr(e)) return Tr(e, t);
        if (Ir(e)) return Qc(e, t);
        if (Sr(e)) return Yc(e, t)
    }
    throw Er(e)
}

function H(e, t) {
    return t ? Kc(e, t) : G(e)
}

function C(...e) {
    let t = Ge(e);
    return H(e, t)
}

function Nt(e, t) {
    let n = E(e) ? e : () => e,
        r = o => o.error(n());
    return new F(t ? o => t.schedule(r, 0, o) : r)
}

function Ni(e) {
    return !!e && (e instanceof F || E(e.lift) && E(e.subscribe))
}
var Ne = Ct(e => function() {
    e(this), this.name = "EmptyError", this.message = "no elements in sequence"
});

function R(e, t) {
    return N((n, r) => {
        let o = 0;
        n.subscribe(x(r, i => {
            r.next(e.call(t, i, o++))
        }))
    })
}
var {
    isArray: th
} = Array;

function nh(e, t) {
    return th(t) ? e(...t) : e(t)
}

function Jc(e) {
    return R(t => nh(e, t))
}
var {
    isArray: rh
} = Array, {
    getPrototypeOf: oh,
    prototype: ih,
    keys: sh
} = Object;

function Xc(e) {
    if (e.length === 1) {
        let t = e[0];
        if (rh(t)) return {
            args: t,
            keys: null
        };
        if (ah(t)) {
            let n = sh(t);
            return {
                args: n.map(r => t[r]),
                keys: n
            }
        }
    }
    return {
        args: e,
        keys: null
    }
}

function ah(e) {
    return e && typeof e == "object" && oh(e) === ih
}

function eu(e, t) {
    return e.reduce((n, r, o) => (n[r] = t[o], n), {})
}

function Nr(...e) {
    let t = Ge(e),
        n = Bc(e),
        {
            args: r,
            keys: o
        } = Xc(e);
    if (r.length === 0) return H([], t);
    let i = new F(ch(r, t, o ? s => eu(o, s) : ie));
    return n ? i.pipe(Jc(n)) : i
}

function ch(e, t, n = ie) {
    return r => {
        tu(t, () => {
            let {
                length: o
            } = e, i = new Array(o), s = o, a = o;
            for (let c = 0; c < o; c++) tu(t, () => {
                let u = H(e[c], t),
                    l = !1;
                u.subscribe(x(r, f => {
                    i[c] = f, l || (l = !0, a--), a || r.next(n(i.slice()))
                }, () => {
                    --s || r.complete()
                }))
            }, r)
        }, r)
    }
}

function tu(e, t, n) {
    e ? ne(n, e, t) : t()
}

function nu(e, t, n, r, o, i, s, a) {
    let c = [],
        u = 0,
        l = 0,
        f = !1,
        p = () => {
            f && !c.length && !u && t.complete()
        },
        d = y => u < r ? h(y) : c.push(y),
        h = y => {
            i && t.next(y), u++;
            let P = !1;
            G(n(y, l++)).subscribe(x(t, j => {
                o?.(j), i ? d(j) : t.next(j)
            }, () => {
                P = !0
            }, void 0, () => {
                if (P) try {
                    for (u--; c.length && u < r;) {
                        let j = c.shift();
                        s ? ne(t, s, () => h(j)) : h(j)
                    }
                    p()
                } catch (j) {
                    t.error(j)
                }
            }))
        };
    return e.subscribe(x(t, d, () => {
        f = !0, p()
    })), () => {
        a?.()
    }
}

function z(e, t, n = 1 / 0) {
    return E(t) ? z((r, o) => R((i, s) => t(r, i, o, s))(G(e(r, o))), n) : (typeof t == "number" && (n = t), N((r, o) => nu(r, o, e, n)))
}

function ru(e = 1 / 0) {
    return z(ie, e)
}

function ou() {
    return ru(1)
}

function xt(...e) {
    return ou()(H(e, Ge(e)))
}

function xr(e) {
    return new F(t => {
        G(e()).subscribe(t)
    })
}

function ge(e, t) {
    return N((n, r) => {
        let o = 0;
        n.subscribe(x(r, i => e.call(t, i, o++) && r.next(i)))
    })
}

function We(e) {
    return N((t, n) => {
        let r = null,
            o = !1,
            i;
        r = t.subscribe(x(n, void 0, void 0, s => {
            i = G(e(s, We(e)(t))), r ? (r.unsubscribe(), r = null, i.subscribe(n)) : o = !0
        })), o && (r.unsubscribe(), r = null, i.subscribe(n))
    })
}

function iu(e, t, n, r, o) {
    return (i, s) => {
        let a = n,
            c = t,
            u = 0;
        i.subscribe(x(s, l => {
            let f = u++;
            c = a ? e(c, l, f) : (a = !0, l), r && s.next(c)
        }, o && (() => {
            a && s.next(c), s.complete()
        })))
    }
}

function Rt(e, t) {
    return E(t) ? z(e, t, 1) : z(e, 1)
}

function Ze(e) {
    return N((t, n) => {
        let r = !1;
        t.subscribe(x(n, o => {
            r = !0, n.next(o)
        }, () => {
            r || n.next(e), n.complete()
        }))
    })
}

function xe(e) {
    return e <= 0 ? () => te : N((t, n) => {
        let r = 0;
        t.subscribe(x(n, o => {
            ++r <= e && (n.next(o), e <= r && n.complete())
        }))
    })
}

function Rr(e = uh) {
    return N((t, n) => {
        let r = !1;
        t.subscribe(x(n, o => {
            r = !0, n.next(o)
        }, () => r ? n.complete() : n.error(e())))
    })
}

function uh() {
    return new Ne
}

function pn(e) {
    return N((t, n) => {
        try {
            t.subscribe(n)
        } finally {
            n.add(e)
        }
    })
}

function Re(e, t) {
    let n = arguments.length >= 2;
    return r => r.pipe(e ? ge((o, i) => e(o, i, r)) : ie, xe(1), n ? Ze(t) : Rr(() => new Ne))
}

function At(e) {
    return e <= 0 ? () => te : N((t, n) => {
        let r = [];
        t.subscribe(x(n, o => {
            r.push(o), e < r.length && r.shift()
        }, () => {
            for (let o of r) n.next(o);
            n.complete()
        }, void 0, () => {
            r = null
        }))
    })
}

function xi(e, t) {
    let n = arguments.length >= 2;
    return r => r.pipe(e ? ge((o, i) => e(o, i, r)) : ie, At(1), n ? Ze(t) : Rr(() => new Ne))
}

function Ri(e, t) {
    return N(iu(e, t, arguments.length >= 2, !0))
}

function Ai(...e) {
    let t = Ge(e);
    return N((n, r) => {
        (t ? xt(e, n, t) : xt(e, n)).subscribe(r)
    })
}

function me(e, t) {
    return N((n, r) => {
        let o = null,
            i = 0,
            s = !1,
            a = () => s && !o && r.complete();
        n.subscribe(x(r, c => {
            o?.unsubscribe();
            let u = 0,
                l = i++;
            G(e(c, l)).subscribe(o = x(r, f => r.next(t ? t(c, f, l, u++) : f), () => {
                o = null, a()
            }))
        }, () => {
            s = !0, a()
        }))
    })
}

function Oi(e) {
    return N((t, n) => {
        G(e).subscribe(x(n, () => n.complete(), fn)), !n.closed && t.subscribe(n)
    })
}

function Q(e, t, n) {
    let r = E(e) || t || n ? {
        next: e,
        error: t,
        complete: n
    } : e;
    return r ? N((o, i) => {
        var s;
        (s = r.subscribe) === null || s === void 0 || s.call(r);
        let a = !0;
        o.subscribe(x(i, c => {
            var u;
            (u = r.next) === null || u === void 0 || u.call(r, c), i.next(c)
        }, () => {
            var c;
            a = !1, (c = r.complete) === null || c === void 0 || c.call(r), i.complete()
        }, c => {
            var u;
            a = !1, (u = r.error) === null || u === void 0 || u.call(r, c), i.error(c)
        }, () => {
            var c, u;
            a && ((c = r.unsubscribe) === null || c === void 0 || c.call(r)), (u = r.finalize) === null || u === void 0 || u.call(r)
        }))
    }) : ie
}
var Qu = "https://angular.dev/best-practices/security#preventing-cross-site-scripting-xss",
    v = class extends Error {
        code;
        constructor(t, n) {
            super(fh(t, n)), this.code = t
        }
    };

function dh(e) {
    return `NG0${Math.abs(e)}`
}

function fh(e, t) {
    return `${dh(e)}${t?": "+t:""}`
}
var Yu = Symbol("InputSignalNode#UNSET"),
    ph = O(m({}, yi), {
        transformFn: void 0,
        applyValueToInputSignal(e, t) {
            vi(e, t)
        }
    });

function Ku(e, t) {
    let n = Object.create(ph);
    n.value = e, n.transformFn = t?.transform;

    function r() {
        if (di(n), n.value === Yu) {
            let o = null;
            throw new v(-950, o)
        }
        return n.value
    }
    return r[Et] = n, r
}

function uo(e) {
    return {
        toString: e
    }.toString()
}

function L(e) {
    for (let t in e)
        if (e[t] === L) return t;
    throw Error("Could not find renamed property on target object.")
}

function oe(e) {
    if (typeof e == "string") return e;
    if (Array.isArray(e)) return `[${e.map(oe).join(", ")}]`;
    if (e == null) return "" + e;
    let t = e.overriddenName || e.name;
    if (t) return `${t}`;
    let n = e.toString();
    if (n == null) return "" + n;
    let r = n.indexOf(`
`);
    return r >= 0 ? n.slice(0, r) : n
}

function su(e, t) {
    return e ? t ? `${e} ${t}` : e : t || ""
}
var hh = L({
    __forward_ref__: L
});

function Ju(e) {
    return e.__forward_ref__ = Ju, e.toString = function() {
        return oe(this())
    }, e
}

function le(e) {
    return Xu(e) ? e() : e
}

function Xu(e) {
    return typeof e == "function" && e.hasOwnProperty(hh) && e.__forward_ref__ === Ju
}

function w(e) {
    return {
        token: e.token,
        providedIn: e.providedIn || null,
        factory: e.factory,
        value: void 0
    }
}

function lo(e) {
    return {
        providers: e.providers || [],
        imports: e.imports || []
    }
}

function fo(e) {
    return au(e, tl) || au(e, nl)
}

function el(e) {
    return fo(e) !== null
}

function au(e, t) {
    return e.hasOwnProperty(t) ? e[t] : null
}

function gh(e) {
    let t = e && (e[tl] || e[nl]);
    return t || null
}

function cu(e) {
    return e && (e.hasOwnProperty(uu) || e.hasOwnProperty(mh)) ? e[uu] : null
}
var tl = L({
        \u0275prov: L
    }),
    uu = L({
        \u0275inj: L
    }),
    nl = L({
        ngInjectableDef: L
    }),
    mh = L({
        ngInjectorDef: L
    }),
    D = class {
        _desc;
        ngMetadataName = "InjectionToken";
        \u0275prov;
        constructor(t, n) {
            this._desc = t, this.\u0275prov = void 0, typeof n == "number" ? this.__NG_ELEMENT_ID__ = n : n !== void 0 && (this.\u0275prov = w({
                token: this,
                providedIn: n.providedIn || "root",
                factory: n.factory
            }))
        }
        get multi() {
            return this
        }
        toString() {
            return `InjectionToken ${this._desc}`
        }
    };

function rl(e) {
    return e && !!e.\u0275providers
}
var vh = L({
        \u0275cmp: L
    }),
    yh = L({
        \u0275dir: L
    }),
    Dh = L({
        \u0275pipe: L
    }),
    wh = L({
        \u0275mod: L
    }),
    Vr = L({
        \u0275fac: L
    }),
    vn = L({
        __NG_ELEMENT_ID__: L
    }),
    lu = L({
        __NG_ENV_ID__: L
    });

function ol(e) {
    return typeof e == "string" ? e : e == null ? "" : String(e)
}

function Eh(e) {
    return typeof e == "function" ? e.name || e.toString() : typeof e == "object" && e != null && typeof e.type == "function" ? e.type.name || e.type.toString() : ol(e)
}

function il(e, t) {
    throw new v(-200, e)
}

function Fs(e, t) {
    throw new v(-201, !1)
}
var b = function(e) {
        return e[e.Default = 0] = "Default", e[e.Host = 1] = "Host", e[e.Self = 2] = "Self", e[e.SkipSelf = 4] = "SkipSelf", e[e.Optional = 8] = "Optional", e
    }(b || {}),
    Gi;

function sl() {
    return Gi
}

function ue(e) {
    let t = Gi;
    return Gi = e, t
}

function al(e, t, n) {
    let r = fo(e);
    if (r && r.providedIn == "root") return r.value === void 0 ? r.value = r.factory() : r.value;
    if (n & b.Optional) return null;
    if (t !== void 0) return t;
    Fs(e, "Injector")
}
var Ch = {},
    it = Ch,
    Ih = "__NG_DI_FLAG__",
    Br = class {
        injector;
        constructor(t) {
            this.injector = t
        }
        retrieve(t, n) {
            let r = n;
            return this.injector.get(t, r.optional ? dr : it, r)
        }
    },
    $r = "ngTempTokenPath",
    bh = "ngTokenPath",
    Sh = /\n/gm,
    Mh = "\u0275",
    du = "__source";

function _h(e, t = b.Default) {
    if (ln() === void 0) throw new v(-203, !1);
    if (ln() === null) return al(e, void 0, t);
    {
        let n = ln(),
            r;
        return n instanceof Br ? r = n.injector : r = n, r.get(e, t & b.Optional ? null : void 0, t)
    }
}

function _(e, t = b.Default) {
    return (sl() || _h)(le(e), t)
}

function g(e, t = b.Default) {
    return _(e, po(t))
}

function po(e) {
    return typeof e > "u" || typeof e == "number" ? e : 0 | (e.optional && 8) | (e.host && 1) | (e.self && 2) | (e.skipSelf && 4)
}

function Wi(e) {
    let t = [];
    for (let n = 0; n < e.length; n++) {
        let r = le(e[n]);
        if (Array.isArray(r)) {
            if (r.length === 0) throw new v(900, !1);
            let o, i = b.Default;
            for (let s = 0; s < r.length; s++) {
                let a = r[s],
                    c = Th(a);
                typeof c == "number" ? c === -1 ? o = a.token : i |= c : o = a
            }
            t.push(_(o, i))
        } else t.push(_(r))
    }
    return t
}

function Th(e) {
    return e[Ih]
}

function Nh(e, t, n, r) {
    let o = e[$r];
    throw t[du] && o.unshift(t[du]), e.message = xh(`
` + e.message, o, n, r), e[bh] = o, e[$r] = null, e
}

function xh(e, t, n, r = null) {
    e = e && e.charAt(0) === `
` && e.charAt(1) == Mh ? e.slice(2) : e;
    let o = oe(t);
    if (Array.isArray(t)) o = t.map(oe).join(" -> ");
    else if (typeof t == "object") {
        let i = [];
        for (let s in t)
            if (t.hasOwnProperty(s)) {
                let a = t[s];
                i.push(s + ":" + (typeof a == "string" ? JSON.stringify(a) : oe(a)))
            } o = `{${i.join(", ")}}`
    }
    return `${n}${r?"("+r+")":""}[${o}]: ${e.replace(Sh,`
  `)}`
}

function Lt(e, t) {
    let n = e.hasOwnProperty(Vr);
    return n ? e[Vr] : null
}

function Rh(e, t, n) {
    if (e.length !== t.length) return !1;
    for (let r = 0; r < e.length; r++) {
        let o = e[r],
            i = t[r];
        if (n && (o = n(o), i = n(i)), i !== o) return !1
    }
    return !0
}

function Ah(e) {
    return e.flat(Number.POSITIVE_INFINITY)
}

function Ls(e, t) {
    e.forEach(n => Array.isArray(n) ? Ls(n, t) : t(n))
}

function cl(e, t, n) {
    t >= e.length ? e.push(n) : e.splice(t, 0, n)
}

function Hr(e, t) {
    return t >= e.length - 1 ? e.pop() : e.splice(t, 1)[0]
}

function Oh(e, t, n, r) {
    let o = e.length;
    if (o == t) e.push(n, r);
    else if (o === 1) e.push(r, e[0]), e[0] = n;
    else {
        for (o--, e.push(e[o - 1], e[o]); o > t;) {
            let i = o - 2;
            e[o] = e[i], o--
        }
        e[t] = n, e[t + 1] = r
    }
}

function kh(e, t, n) {
    let r = Rn(e, t);
    return r >= 0 ? e[r | 1] = n : (r = ~r, Oh(e, r, t, n)), r
}

function ki(e, t) {
    let n = Rn(e, t);
    if (n >= 0) return e[n | 1]
}

function Rn(e, t) {
    return Ph(e, t, 1)
}

function Ph(e, t, n) {
    let r = 0,
        o = e.length >> n;
    for (; o !== r;) {
        let i = r + (o - r >> 1),
            s = e[i << n];
        if (t === s) return i << n;
        s > t ? o = i : r = i + 1
    }
    return ~(o << n)
}
var jt = {},
    ye = [],
    yn = new D(""),
    ul = new D("", -1),
    ll = new D(""),
    Ur = class {
        get(t, n = it) {
            if (n === it) {
                let r = new Error(`NullInjectorError: No provider for ${oe(t)}!`);
                throw r.name = "NullInjectorError", r
            }
            return n
        }
    };

function dl(e, t) {
    let n = e[wh] || null;
    if (!n && t === !0) throw new Error(`Type ${oe(e)} does not have '\u0275mod' property.`);
    return n
}

function Vt(e) {
    return e[vh] || null
}

function Fh(e) {
    return e[yh] || null
}

function Lh(e) {
    return e[Dh] || null
}

function js(e) {
    return {
        \u0275providers: e
    }
}

function jh(...e) {
    return {
        \u0275providers: fl(!0, e),
        \u0275fromNgModule: !0
    }
}

function fl(e, ...t) {
    let n = [],
        r = new Set,
        o, i = s => {
            n.push(s)
        };
    return Ls(t, s => {
        let a = s;
        Zi(a, i, [], r) && (o ||= [], o.push(a))
    }), o !== void 0 && pl(o, i), n
}

function pl(e, t) {
    for (let n = 0; n < e.length; n++) {
        let {
            ngModule: r,
            providers: o
        } = e[n];
        Vs(o, i => {
            t(i, r)
        })
    }
}

function Zi(e, t, n, r) {
    if (e = le(e), !e) return !1;
    let o = null,
        i = cu(e),
        s = !i && Vt(e);
    if (!i && !s) {
        let c = e.ngModule;
        if (i = cu(c), i) o = c;
        else return !1
    } else {
        if (s && !s.standalone) return !1;
        o = e
    }
    let a = r.has(o);
    if (s) {
        if (a) return !1;
        if (r.add(o), s.dependencies) {
            let c = typeof s.dependencies == "function" ? s.dependencies() : s.dependencies;
            for (let u of c) Zi(u, t, n, r)
        }
    } else if (i) {
        if (i.imports != null && !a) {
            r.add(o);
            let u;
            try {
                Ls(i.imports, l => {
                    Zi(l, t, n, r) && (u ||= [], u.push(l))
                })
            } finally {}
            u !== void 0 && pl(u, t)
        }
        if (!a) {
            let u = Lt(o) || (() => new o);
            t({
                provide: o,
                useFactory: u,
                deps: ye
            }, o), t({
                provide: ll,
                useValue: o,
                multi: !0
            }, o), t({
                provide: yn,
                useValue: () => _(o),
                multi: !0
            }, o)
        }
        let c = i.providers;
        if (c != null && !a) {
            let u = e;
            Vs(c, l => {
                t(l, u)
            })
        }
    } else return !1;
    return o !== e && e.providers !== void 0
}

function Vs(e, t) {
    for (let n of e) rl(n) && (n = n.\u0275providers), Array.isArray(n) ? Vs(n, t) : t(n)
}
var Vh = L({
    provide: String,
    useValue: L
});

function hl(e) {
    return e !== null && typeof e == "object" && Vh in e
}

function Bh(e) {
    return !!(e && e.useExisting)
}

function $h(e) {
    return !!(e && e.useFactory)
}

function Qi(e) {
    return typeof e == "function"
}
var ho = new D(""),
    Or = {},
    fu = {},
    Pi;

function Bs() {
    return Pi === void 0 && (Pi = new Ur), Pi
}
var fe = class {},
    Dn = class extends fe {
        parent;
        source;
        scopes;
        records = new Map;
        _ngOnDestroyHooks = new Set;
        _onDestroyHooks = [];
        get destroyed() {
            return this._destroyed
        }
        _destroyed = !1;
        injectorDefTypes;
        constructor(t, n, r, o) {
            super(), this.parent = n, this.source = r, this.scopes = o, Ki(t, s => this.processProvider(s)), this.records.set(ul, Ot(void 0, this)), o.has("environment") && this.records.set(fe, Ot(void 0, this));
            let i = this.records.get(ho);
            i != null && typeof i.value == "string" && this.scopes.add(i.value), this.injectorDefTypes = new Set(this.get(ll, ye, b.Self))
        }
        retrieve(t, n) {
            let r = n;
            return this.get(t, r.optional ? dr : it, r)
        }
        destroy() {
            gn(this), this._destroyed = !0;
            let t = T(null);
            try {
                for (let r of this._ngOnDestroyHooks) r.ngOnDestroy();
                let n = this._onDestroyHooks;
                this._onDestroyHooks = [];
                for (let r of n) r()
            } finally {
                this.records.clear(), this._ngOnDestroyHooks.clear(), this.injectorDefTypes.clear(), T(t)
            }
        }
        onDestroy(t) {
            return gn(this), this._onDestroyHooks.push(t), () => this.removeOnDestroy(t)
        }
        runInContext(t) {
            gn(this);
            let n = Te(this),
                r = ue(void 0),
                o;
            try {
                return t()
            } finally {
                Te(n), ue(r)
            }
        }
        get(t, n = it, r = b.Default) {
            if (gn(this), t.hasOwnProperty(lu)) return t[lu](this);
            r = po(r);
            let o, i = Te(this),
                s = ue(void 0);
            try {
                if (!(r & b.SkipSelf)) {
                    let c = this.records.get(t);
                    if (c === void 0) {
                        let u = Wh(t) && fo(t);
                        u && this.injectableDefInScope(u) ? c = Ot(Yi(t), Or) : c = null, this.records.set(t, c)
                    }
                    if (c != null) return this.hydrate(t, c, r)
                }
                let a = r & b.Self ? Bs() : this.parent;
                return n = r & b.Optional && n === it ? null : n, a.get(t, n)
            } catch (a) {
                if (a.name === "NullInjectorError") {
                    if ((a[$r] = a[$r] || []).unshift(oe(t)), i) throw a;
                    return Nh(a, t, "R3InjectorError", this.source)
                } else throw a
            } finally {
                ue(s), Te(i)
            }
        }
        resolveInjectorInitializers() {
            let t = T(null),
                n = Te(this),
                r = ue(void 0),
                o;
            try {
                let i = this.get(yn, ye, b.Self);
                for (let s of i) s()
            } finally {
                Te(n), ue(r), T(t)
            }
        }
        toString() {
            let t = [],
                n = this.records;
            for (let r of n.keys()) t.push(oe(r));
            return `R3Injector[${t.join(", ")}]`
        }
        processProvider(t) {
            t = le(t);
            let n = Qi(t) ? t : le(t && t.provide),
                r = Uh(t);
            if (!Qi(t) && t.multi === !0) {
                let o = this.records.get(n);
                o || (o = Ot(void 0, Or, !0), o.factory = () => Wi(o.multi), this.records.set(n, o)), n = t, o.multi.push(t)
            }
            this.records.set(n, r)
        }
        hydrate(t, n, r) {
            let o = T(null);
            try {
                return n.value === fu ? il(oe(t)) : n.value === Or && (n.value = fu, n.value = n.factory(void 0, r)), typeof n.value == "object" && n.value && Gh(n.value) && this._ngOnDestroyHooks.add(n.value), n.value
            } finally {
                T(o)
            }
        }
        injectableDefInScope(t) {
            if (!t.providedIn) return !1;
            let n = le(t.providedIn);
            return typeof n == "string" ? n === "any" || this.scopes.has(n) : this.injectorDefTypes.has(n)
        }
        removeOnDestroy(t) {
            let n = this._onDestroyHooks.indexOf(t);
            n !== -1 && this._onDestroyHooks.splice(n, 1)
        }
    };

function Yi(e) {
    let t = fo(e),
        n = t !== null ? t.factory : Lt(e);
    if (n !== null) return n;
    if (e instanceof D) throw new v(204, !1);
    if (e instanceof Function) return Hh(e);
    throw new v(204, !1)
}

function Hh(e) {
    if (e.length > 0) throw new v(204, !1);
    let n = gh(e);
    return n !== null ? () => n.factory(e) : () => new e
}

function Uh(e) {
    if (hl(e)) return Ot(void 0, e.useValue);
    {
        let t = zh(e);
        return Ot(t, Or)
    }
}

function zh(e, t, n) {
    let r;
    if (Qi(e)) {
        let o = le(e);
        return Lt(o) || Yi(o)
    } else if (hl(e)) r = () => le(e.useValue);
    else if ($h(e)) r = () => e.useFactory(...Wi(e.deps || []));
    else if (Bh(e)) r = (o, i) => _(le(e.useExisting), i !== void 0 && i & b.Optional ? b.Optional : void 0);
    else {
        let o = le(e && (e.useClass || e.provide));
        if (qh(e)) r = () => new o(...Wi(e.deps));
        else return Lt(o) || Yi(o)
    }
    return r
}

function gn(e) {
    if (e.destroyed) throw new v(205, !1)
}

function Ot(e, t, n = !1) {
    return {
        factory: e,
        value: t,
        multi: n ? [] : void 0
    }
}

function qh(e) {
    return !!e.deps
}

function Gh(e) {
    return e !== null && typeof e == "object" && typeof e.ngOnDestroy == "function"
}

function Wh(e) {
    return typeof e == "function" || typeof e == "object" && e instanceof D
}

function Ki(e, t) {
    for (let n of e) Array.isArray(n) ? Ki(n, t) : n && rl(n) ? Ki(n.\u0275providers, t) : t(n)
}

function Ee(e, t) {
    let n;
    e instanceof Dn ? (gn(e), n = e) : n = new Br(e);
    let r, o = Te(n),
        i = ue(void 0);
    try {
        return t()
    } finally {
        Te(o), ue(i)
    }
}

function Zh() {
    return sl() !== void 0 || ln() != null
}

function Qh(e) {
    return typeof e == "function"
}
var Le = 0,
    M = 1,
    I = 2,
    X = 3,
    De = 4,
    Ce = 5,
    wn = 6,
    zr = 7,
    K = 8,
    ct = 9,
    Ae = 10,
    se = 11,
    En = 12,
    pu = 13,
    An = 14,
    we = 15,
    ut = 16,
    kt = 17,
    Oe = 18,
    go = 19,
    gl = 20,
    Qe = 21,
    Fi = 22,
    qr = 23,
    de = 24,
    Li = 25,
    ke = 26,
    ml = 1;
var lt = 7,
    Gr = 8,
    Bt = 9,
    J = 10;

function st(e) {
    return Array.isArray(e) && typeof e[ml] == "object"
}

function je(e) {
    return Array.isArray(e) && e[ml] === !0
}

function vl(e) {
    return (e.flags & 4) !== 0
}

function Ut(e) {
    return e.componentOffset > -1
}

function $s(e) {
    return (e.flags & 1) === 1
}

function gt(e) {
    return !!e.template
}

function Wr(e) {
    return (e[I] & 512) !== 0
}

function zt(e) {
    return (e[I] & 256) === 256
}
var Ji = class {
    previousValue;
    currentValue;
    firstChange;
    constructor(t, n, r) {
        this.previousValue = t, this.currentValue = n, this.firstChange = r
    }
    isFirstChange() {
        return this.firstChange
    }
};

function yl(e, t, n, r) {
    t !== null ? t.applyValueToInputSignal(t, r) : e[n] = r
}
var Hs = (() => {
    let e = () => Dl;
    return e.ngInherit = !0, e
})();

function Dl(e) {
    return e.type.prototype.ngOnChanges && (e.setInput = Kh), Yh
}

function Yh() {
    let e = El(this),
        t = e?.current;
    if (t) {
        let n = e.previous;
        if (n === jt) e.previous = t;
        else
            for (let r in t) n[r] = t[r];
        e.current = null, this.ngOnChanges(t)
    }
}

function Kh(e, t, n, r, o) {
    let i = this.declaredInputs[r],
        s = El(e) || Jh(e, {
            previous: jt,
            current: null
        }),
        a = s.current || (s.current = {}),
        c = s.previous,
        u = c[i];
    a[i] = new Ji(u && u.currentValue, n, c === jt), yl(e, t, o, n)
}
var wl = "__ngSimpleChanges__";

function El(e) {
    return e[wl] || null
}

function Jh(e, t) {
    return e[wl] = t
}
var hu = null;
var V = function(e, t = null, n) {
        hu?.(e, t, n)
    },
    Xh = "svg",
    eg = "math";

function Se(e) {
    for (; Array.isArray(e);) e = e[Le];
    return e
}

function tg(e, t) {
    return Se(t[e])
}

function Ve(e, t) {
    return Se(t[e.index])
}

function Us(e, t) {
    return e.data[t]
}

function Pe(e, t) {
    let n = t[e];
    return st(n) ? n : n[Le]
}

function ng(e) {
    return (e[I] & 4) === 4
}

function zs(e) {
    return (e[I] & 128) === 128
}

function rg(e) {
    return je(e[X])
}

function Cn(e, t) {
    return t == null ? null : e[t]
}

function Cl(e) {
    e[kt] = 0
}

function Il(e) {
    e[I] & 1024 || (e[I] |= 1024, zs(e) && vo(e))
}

function mo(e) {
    return !!(e[I] & 9216 || e[de]?.dirty)
}

function Xi(e) {
    e[Ae].changeDetectionScheduler?.notify(8), e[I] & 64 && (e[I] |= 1024), mo(e) && vo(e)
}

function vo(e) {
    e[Ae].changeDetectionScheduler?.notify(0);
    let t = dt(e);
    for (; t !== null && !(t[I] & 8192 || (t[I] |= 8192, !zs(t)));) t = dt(t)
}

function bl(e, t) {
    if (zt(e)) throw new v(911, !1);
    e[Qe] === null && (e[Qe] = []), e[Qe].push(t)
}

function og(e, t) {
    if (e[Qe] === null) return;
    let n = e[Qe].indexOf(t);
    n !== -1 && e[Qe].splice(n, 1)
}

function dt(e) {
    let t = e[X];
    return je(t) ? t[X] : t
}

function qs(e) {
    return e[zr] ??= []
}

function Gs(e) {
    return e.cleanup ??= []
}

function ig(e, t, n, r) {
    let o = qs(t);
    o.push(n), e.firstCreatePass && Gs(e).push(r, o.length - 1)
}
var A = {
    lFrame: Ol(null),
    bindingsEnabled: !0,
    skipHydrationRootTNode: null
};
var es = !1;

function sg() {
    return A.lFrame.elementDepthCount
}

function ag() {
    A.lFrame.elementDepthCount++
}

function cg() {
    A.lFrame.elementDepthCount--
}

function Sl() {
    return A.bindingsEnabled
}

function ug() {
    return A.skipHydrationRootTNode !== null
}

function lg(e) {
    return A.skipHydrationRootTNode === e
}

function dg() {
    A.skipHydrationRootTNode = null
}

function B() {
    return A.lFrame.lView
}

function Be() {
    return A.lFrame.tView
}

function $e() {
    let e = Ml();
    for (; e !== null && e.type === 64;) e = e.parent;
    return e
}

function Ml() {
    return A.lFrame.currentTNode
}

function fg() {
    let e = A.lFrame,
        t = e.currentTNode;
    return e.isParent ? t : t.parent
}

function yo(e, t) {
    let n = A.lFrame;
    n.currentTNode = e, n.isParent = t
}

function _l() {
    return A.lFrame.isParent
}

function pg() {
    A.lFrame.isParent = !1
}

function Tl() {
    return es
}

function gu(e) {
    let t = es;
    return es = e, t
}

function hg(e) {
    return A.lFrame.bindingIndex = e
}

function Nl() {
    return A.lFrame.bindingIndex++
}

function gg(e) {
    let t = A.lFrame,
        n = t.bindingIndex;
    return t.bindingIndex = t.bindingIndex + e, n
}

function mg() {
    return A.lFrame.inI18n
}

function vg(e, t) {
    let n = A.lFrame;
    n.bindingIndex = n.bindingRootIndex = e, ts(t)
}

function yg() {
    return A.lFrame.currentDirectiveIndex
}

function ts(e) {
    A.lFrame.currentDirectiveIndex = e
}

function Dg(e) {
    let t = A.lFrame.currentDirectiveIndex;
    return t === -1 ? null : e[t]
}

function xl() {
    return A.lFrame.currentQueryIndex
}

function Ws(e) {
    A.lFrame.currentQueryIndex = e
}

function wg(e) {
    let t = e[M];
    return t.type === 2 ? t.declTNode : t.type === 1 ? e[Ce] : null
}

function Rl(e, t, n) {
    if (n & b.SkipSelf) {
        let o = t,
            i = e;
        for (; o = o.parent, o === null && !(n & b.Host);)
            if (o = wg(i), o === null || (i = i[An], o.type & 10)) break;
        if (o === null) return !1;
        t = o, e = i
    }
    let r = A.lFrame = Al();
    return r.currentTNode = t, r.lView = e, !0
}

function Zs(e) {
    let t = Al(),
        n = e[M];
    A.lFrame = t, t.currentTNode = n.firstChild, t.lView = e, t.tView = n, t.contextLView = e, t.bindingIndex = n.bindingStartIndex, t.inI18n = !1
}

function Al() {
    let e = A.lFrame,
        t = e === null ? null : e.child;
    return t === null ? Ol(e) : t
}

function Ol(e) {
    let t = {
        currentTNode: null,
        isParent: !0,
        lView: null,
        tView: null,
        selectedIndex: -1,
        contextLView: null,
        elementDepthCount: 0,
        currentNamespace: null,
        currentDirectiveIndex: -1,
        bindingRootIndex: -1,
        bindingIndex: -1,
        currentQueryIndex: 0,
        parent: e,
        child: null,
        inI18n: !1
    };
    return e !== null && (e.child = t), t
}

function kl() {
    let e = A.lFrame;
    return A.lFrame = e.parent, e.currentTNode = null, e.lView = null, e
}
var Pl = kl;

function Qs() {
    let e = kl();
    e.isParent = !0, e.tView = null, e.selectedIndex = -1, e.contextLView = null, e.elementDepthCount = 0, e.currentDirectiveIndex = -1, e.currentNamespace = null, e.bindingRootIndex = -1, e.bindingIndex = -1, e.currentQueryIndex = 0
}

function qt() {
    return A.lFrame.selectedIndex
}

function ft(e) {
    A.lFrame.selectedIndex = e
}

function Eg() {
    let e = A.lFrame;
    return Us(e.tView, e.selectedIndex)
}

function Cg() {
    return A.lFrame.currentNamespace
}
var Fl = !0;

function Ll() {
    return Fl
}

function jl(e) {
    Fl = e
}

function Ig(e, t, n) {
    let {
        ngOnChanges: r,
        ngOnInit: o,
        ngDoCheck: i
    } = t.type.prototype;
    if (r) {
        let s = Dl(t);
        (n.preOrderHooks ??= []).push(e, s), (n.preOrderCheckHooks ??= []).push(e, s)
    }
    o && (n.preOrderHooks ??= []).push(0 - e, o), i && ((n.preOrderHooks ??= []).push(e, i), (n.preOrderCheckHooks ??= []).push(e, i))
}

function Vl(e, t) {
    for (let n = t.directiveStart, r = t.directiveEnd; n < r; n++) {
        let i = e.data[n].type.prototype,
            {
                ngAfterContentInit: s,
                ngAfterContentChecked: a,
                ngAfterViewInit: c,
                ngAfterViewChecked: u,
                ngOnDestroy: l
            } = i;
        s && (e.contentHooks ??= []).push(-n, s), a && ((e.contentHooks ??= []).push(n, a), (e.contentCheckHooks ??= []).push(n, a)), c && (e.viewHooks ??= []).push(-n, c), u && ((e.viewHooks ??= []).push(n, u), (e.viewCheckHooks ??= []).push(n, u)), l != null && (e.destroyHooks ??= []).push(n, l)
    }
}

function kr(e, t, n) {
    Bl(e, t, 3, n)
}

function Pr(e, t, n, r) {
    (e[I] & 3) === n && Bl(e, t, n, r)
}

function ji(e, t) {
    let n = e[I];
    (n & 3) === t && (n &= 16383, n += 1, e[I] = n)
}

function Bl(e, t, n, r) {
    let o = r !== void 0 ? e[kt] & 65535 : 0,
        i = r ?? -1,
        s = t.length - 1,
        a = 0;
    for (let c = o; c < s; c++)
        if (typeof t[c + 1] == "number") {
            if (a = t[c], r != null && a >= r) break
        } else t[c] < 0 && (e[kt] += 65536), (a < i || i == -1) && (bg(e, n, t, c), e[kt] = (e[kt] & 4294901760) + c + 2), c++
}

function mu(e, t) {
    V(4, e, t);
    let n = T(null);
    try {
        t.call(e)
    } finally {
        T(n), V(5, e, t)
    }
}

function bg(e, t, n, r) {
    let o = n[r] < 0,
        i = n[r + 1],
        s = o ? -n[r] : n[r],
        a = e[s];
    o ? e[I] >> 14 < e[kt] >> 16 && (e[I] & 3) === t && (e[I] += 16384, mu(a, i)) : mu(a, i)
}
var Ft = -1,
    In = class {
        factory;
        injectImpl;
        resolving = !1;
        canSeeViewProviders;
        multi;
        componentProviders;
        index;
        providerFactory;
        constructor(t, n, r) {
            this.factory = t, this.canSeeViewProviders = n, this.injectImpl = r
        }
    };

function Sg(e) {
    return (e.flags & 8) !== 0
}

function Mg(e) {
    return (e.flags & 16) !== 0
}

function _g(e, t, n) {
    let r = 0;
    for (; r < n.length;) {
        let o = n[r];
        if (typeof o == "number") {
            if (o !== 0) break;
            r++;
            let i = n[r++],
                s = n[r++],
                a = n[r++];
            e.setAttribute(t, s, a, i)
        } else {
            let i = o,
                s = n[++r];
            Ng(i) ? e.setProperty(t, i, s) : e.setAttribute(t, i, s), r++
        }
    }
    return r
}

function Tg(e) {
    return e === 3 || e === 4 || e === 6
}

function Ng(e) {
    return e.charCodeAt(0) === 64
}

function Ys(e, t) {
    if (!(t === null || t.length === 0))
        if (e === null || e.length === 0) e = t.slice();
        else {
            let n = -1;
            for (let r = 0; r < t.length; r++) {
                let o = t[r];
                typeof o == "number" ? n = o : n === 0 || (n === -1 || n === 2 ? vu(e, n, o, null, t[++r]) : vu(e, n, o, null, null))
            }
        } return e
}

function vu(e, t, n, r, o) {
    let i = 0,
        s = e.length;
    if (t === -1) s = -1;
    else
        for (; i < e.length;) {
            let a = e[i++];
            if (typeof a == "number") {
                if (a === t) {
                    s = -1;
                    break
                } else if (a > t) {
                    s = i - 1;
                    break
                }
            }
        }
    for (; i < e.length;) {
        let a = e[i];
        if (typeof a == "number") break;
        if (a === n) {
            o !== null && (e[i + 1] = o);
            return
        }
        i++, o !== null && i++
    }
    s !== -1 && (e.splice(s, 0, t), i = s + 1), e.splice(i++, 0, n), o !== null && e.splice(i++, 0, o)
}

function $l(e) {
    return e !== Ft
}

function Zr(e) {
    return e & 32767
}

function xg(e) {
    return e >> 16
}

function Qr(e, t) {
    let n = xg(e),
        r = t;
    for (; n > 0;) r = r[An], n--;
    return r
}
var ns = !0;

function yu(e) {
    let t = ns;
    return ns = e, t
}
var Rg = 256,
    Hl = Rg - 1,
    Ul = 5,
    Ag = 0,
    be = {};

function Og(e, t, n) {
    let r;
    typeof n == "string" ? r = n.charCodeAt(0) || 0 : n.hasOwnProperty(vn) && (r = n[vn]), r == null && (r = n[vn] = Ag++);
    let o = r & Hl,
        i = 1 << o;
    t.data[e + (o >> Ul)] |= i
}

function zl(e, t) {
    let n = ql(e, t);
    if (n !== -1) return n;
    let r = t[M];
    r.firstCreatePass && (e.injectorIndex = t.length, Vi(r.data, e), Vi(t, null), Vi(r.blueprint, null));
    let o = Ks(e, t),
        i = e.injectorIndex;
    if ($l(o)) {
        let s = Zr(o),
            a = Qr(o, t),
            c = a[M].data;
        for (let u = 0; u < 8; u++) t[i + u] = a[s + u] | c[s + u]
    }
    return t[i + 8] = o, i
}

function Vi(e, t) {
    e.push(0, 0, 0, 0, 0, 0, 0, 0, t)
}

function ql(e, t) {
    return e.injectorIndex === -1 || e.parent && e.parent.injectorIndex === e.injectorIndex || t[e.injectorIndex + 8] === null ? -1 : e.injectorIndex
}

function Ks(e, t) {
    if (e.parent && e.parent.injectorIndex !== -1) return e.parent.injectorIndex;
    let n = 0,
        r = null,
        o = t;
    for (; o !== null;) {
        if (r = Yl(o), r === null) return Ft;
        if (n++, o = o[An], r.injectorIndex !== -1) return r.injectorIndex | n << 16
    }
    return Ft
}

function kg(e, t, n) {
    Og(e, t, n)
}

function Gl(e, t, n) {
    if (n & b.Optional || e !== void 0) return e;
    Fs(t, "NodeInjector")
}

function Wl(e, t, n, r) {
    if (n & b.Optional && r === void 0 && (r = null), (n & (b.Self | b.Host)) === 0) {
        let o = e[ct],
            i = ue(void 0);
        try {
            return o ? o.get(t, r, n & b.Optional) : al(t, r, n & b.Optional)
        } finally {
            ue(i)
        }
    }
    return Gl(r, t, n)
}

function Zl(e, t, n, r = b.Default, o) {
    if (e !== null) {
        if (t[I] & 2048 && !(r & b.Self)) {
            let s = jg(e, t, n, r, be);
            if (s !== be) return s
        }
        let i = Ql(e, t, n, r, be);
        if (i !== be) return i
    }
    return Wl(t, n, r, o)
}

function Ql(e, t, n, r, o) {
    let i = Fg(n);
    if (typeof i == "function") {
        if (!Rl(t, e, r)) return r & b.Host ? Gl(o, n, r) : Wl(t, n, r, o);
        try {
            let s;
            if (s = i(r), s == null && !(r & b.Optional)) Fs(n);
            else return s
        } finally {
            Pl()
        }
    } else if (typeof i == "number") {
        let s = null,
            a = ql(e, t),
            c = Ft,
            u = r & b.Host ? t[we][Ce] : null;
        for ((a === -1 || r & b.SkipSelf) && (c = a === -1 ? Ks(e, t) : t[a + 8], c === Ft || !wu(r, !1) ? a = -1 : (s = t[M], a = Zr(c), t = Qr(c, t))); a !== -1;) {
            let l = t[M];
            if (Du(i, a, l.data)) {
                let f = Pg(a, t, n, s, r, u);
                if (f !== be) return f
            }
            c = t[a + 8], c !== Ft && wu(r, t[M].data[a + 8] === u) && Du(i, a, t) ? (s = l, a = Zr(c), t = Qr(c, t)) : a = -1
        }
    }
    return o
}

function Pg(e, t, n, r, o, i) {
    let s = t[M],
        a = s.data[e + 8],
        c = r == null ? Ut(a) && ns : r != s && (a.type & 3) !== 0,
        u = o & b.Host && i === a,
        l = Fr(a, s, n, c, u);
    return l !== null ? Yr(t, s, l, a, o) : be
}

function Fr(e, t, n, r, o) {
    let i = e.providerIndexes,
        s = t.data,
        a = i & 1048575,
        c = e.directiveStart,
        u = e.directiveEnd,
        l = i >> 20,
        f = r ? a : a + l,
        p = o ? a + l : u;
    for (let d = f; d < p; d++) {
        let h = s[d];
        if (d < c && n === h || d >= c && h.type === n) return d
    }
    if (o) {
        let d = s[c];
        if (d && gt(d) && d.type === n) return c
    }
    return null
}

function Yr(e, t, n, r, o) {
    let i = e[n],
        s = t.data;
    if (i instanceof In) {
        let a = i;
        a.resolving && il(Eh(s[n]));
        let c = yu(a.canSeeViewProviders);
        a.resolving = !0;
        let u, l = a.injectImpl ? ue(a.injectImpl) : null,
            f = Rl(e, r, b.Default);
        try {
            i = e[n] = a.factory(void 0, o, s, e, r), t.firstCreatePass && n >= r.directiveStart && Ig(n, s[n], t)
        } finally {
            l !== null && ue(l), yu(c), a.resolving = !1, Pl()
        }
    }
    return i
}

function Fg(e) {
    if (typeof e == "string") return e.charCodeAt(0) || 0;
    let t = e.hasOwnProperty(vn) ? e[vn] : void 0;
    return typeof t == "number" ? t >= 0 ? t & Hl : Lg : t
}

function Du(e, t, n) {
    let r = 1 << e;
    return !!(n[t + (e >> Ul)] & r)
}

function wu(e, t) {
    return !(e & b.Self) && !(e & b.Host && t)
}
var at = class {
    _tNode;
    _lView;
    constructor(t, n) {
        this._tNode = t, this._lView = n
    }
    get(t, n, r) {
        return Zl(this._tNode, this._lView, t, po(r), n)
    }
};

function Lg() {
    return new at($e(), B())
}

function Js(e) {
    return uo(() => {
        let t = e.prototype.constructor,
            n = t[Vr] || rs(t),
            r = Object.prototype,
            o = Object.getPrototypeOf(e.prototype).constructor;
        for (; o && o !== r;) {
            let i = o[Vr] || rs(o);
            if (i && i !== n) return i;
            o = Object.getPrototypeOf(o)
        }
        return i => new i
    })
}

function rs(e) {
    return Xu(e) ? () => {
        let t = rs(le(e));
        return t && t()
    } : Lt(e)
}

function jg(e, t, n, r, o) {
    let i = e,
        s = t;
    for (; i !== null && s !== null && s[I] & 2048 && !Wr(s);) {
        let a = Ql(i, s, n, r | b.Self, be);
        if (a !== be) return a;
        let c = i.parent;
        if (!c) {
            let u = s[gl];
            if (u) {
                let l = u.get(n, be, r);
                if (l !== be) return l
            }
            c = Yl(s), s = s[An]
        }
        i = c
    }
    return o
}

function Yl(e) {
    let t = e[M],
        n = t.type;
    return n === 2 ? t.declTNode : n === 1 ? e[Ce] : null
}

function Eu(e, t = null, n = null, r) {
    let o = Kl(e, t, n, r);
    return o.resolveInjectorInitializers(), o
}

function Kl(e, t = null, n = null, r, o = new Set) {
    let i = [n || ye, jh(e)];
    return r = r || (typeof e == "object" ? void 0 : oe(e)), new Dn(i, t || Bs(), r || null, o)
}
var Ye = class e {
    static THROW_IF_NOT_FOUND = it;
    static NULL = new Ur;
    static create(t, n) {
        if (Array.isArray(t)) return Eu({
            name: ""
        }, n, t, "");
        {
            let r = t.name ?? "";
            return Eu({
                name: r
            }, t.parent, t.providers, r)
        }
    }
    static \u0275prov = w({
        token: e,
        providedIn: "any",
        factory: () => _(ul)
    });
    static __NG_ELEMENT_ID__ = -1
};
var Vg = new D("");
Vg.__NG_ELEMENT_ID__ = e => {
    let t = $e();
    if (t === null) throw new v(204, !1);
    if (t.type & 2) return t.value;
    if (e & b.Optional) return null;
    throw new v(204, !1)
};
var Jl = !1,
    Do = (() => {
        class e {
            static __NG_ELEMENT_ID__ = Bg;
            static __NG_ENV_ID__ = n => n
        }
        return e
    })(),
    os = class extends Do {
        _lView;
        constructor(t) {
            super(), this._lView = t
        }
        onDestroy(t) {
            let n = this._lView;
            return zt(n) ? (t(), () => {}) : (bl(n, t), () => og(n, t))
        }
    };

function Bg() {
    return new os(B())
}
var bn = class {},
    Xs = new D("", {
        providedIn: "root",
        factory: () => !1
    });
var Xl = new D(""),
    ed = new D(""),
    Gt = (() => {
        class e {
            taskId = 0;
            pendingTasks = new Set;
            get _hasPendingTasks() {
                return this.hasPendingTasks.value
            }
            hasPendingTasks = new Z(!1);
            add() {
                this._hasPendingTasks || this.hasPendingTasks.next(!0);
                let n = this.taskId++;
                return this.pendingTasks.add(n), n
            }
            has(n) {
                return this.pendingTasks.has(n)
            }
            remove(n) {
                this.pendingTasks.delete(n), this.pendingTasks.size === 0 && this._hasPendingTasks && this.hasPendingTasks.next(!1)
            }
            ngOnDestroy() {
                this.pendingTasks.clear(), this._hasPendingTasks && this.hasPendingTasks.next(!1)
            }
            static \u0275prov = w({
                token: e,
                providedIn: "root",
                factory: () => new e
            })
        }
        return e
    })();
var is = class extends q {
        __isAsync;
        destroyRef = void 0;
        pendingTasks = void 0;
        constructor(t = !1) {
            super(), this.__isAsync = t, Zh() && (this.destroyRef = g(Do, {
                optional: !0
            }) ?? void 0, this.pendingTasks = g(Gt, {
                optional: !0
            }) ?? void 0)
        }
        emit(t) {
            let n = T(null);
            try {
                super.next(t)
            } finally {
                T(n)
            }
        }
        subscribe(t, n, r) {
            let o = t,
                i = n || (() => null),
                s = r;
            if (t && typeof t == "object") {
                let c = t;
                o = c.next?.bind(c), i = c.error?.bind(c), s = c.complete?.bind(c)
            }
            this.__isAsync && (i = this.wrapInTimeout(i), o && (o = this.wrapInTimeout(o)), s && (s = this.wrapInTimeout(s)));
            let a = super.subscribe({
                next: o,
                error: i,
                complete: s
            });
            return t instanceof $ && t.add(a), a
        }
        wrapInTimeout(t) {
            return n => {
                let r = this.pendingTasks?.add();
                setTimeout(() => {
                    try {
                        t(n)
                    } finally {
                        r !== void 0 && this.pendingTasks?.remove(r)
                    }
                })
            }
        }
    },
    re = is;

function Kr(...e) {}

function td(e) {
    let t, n;

    function r() {
        e = Kr;
        try {
            n !== void 0 && typeof cancelAnimationFrame == "function" && cancelAnimationFrame(n), t !== void 0 && clearTimeout(t)
        } catch {}
    }
    return t = setTimeout(() => {
        e(), r()
    }), typeof requestAnimationFrame == "function" && (n = requestAnimationFrame(() => {
        e(), r()
    })), () => r()
}

function Cu(e) {
    return queueMicrotask(() => e()), () => {
        e = Kr
    }
}
var ea = "isAngularZone",
    Jr = ea + "_ID",
    $g = 0,
    W = class e {
        hasPendingMacrotasks = !1;
        hasPendingMicrotasks = !1;
        isStable = !0;
        onUnstable = new re(!1);
        onMicrotaskEmpty = new re(!1);
        onStable = new re(!1);
        onError = new re(!1);
        constructor(t) {
            let {
                enableLongStackTrace: n = !1,
                shouldCoalesceEventChangeDetection: r = !1,
                shouldCoalesceRunChangeDetection: o = !1,
                scheduleInRootZone: i = Jl
            } = t;
            if (typeof Zone > "u") throw new v(908, !1);
            Zone.assertZonePatched();
            let s = this;
            s._nesting = 0, s._outer = s._inner = Zone.current, Zone.TaskTrackingZoneSpec && (s._inner = s._inner.fork(new Zone.TaskTrackingZoneSpec)), n && Zone.longStackTraceZoneSpec && (s._inner = s._inner.fork(Zone.longStackTraceZoneSpec)), s.shouldCoalesceEventChangeDetection = !o && r, s.shouldCoalesceRunChangeDetection = o, s.callbackScheduled = !1, s.scheduleInRootZone = i, zg(s)
        }
        static isInAngularZone() {
            return typeof Zone < "u" && Zone.current.get(ea) === !0
        }
        static assertInAngularZone() {
            if (!e.isInAngularZone()) throw new v(909, !1)
        }
        static assertNotInAngularZone() {
            if (e.isInAngularZone()) throw new v(909, !1)
        }
        run(t, n, r) {
            return this._inner.run(t, n, r)
        }
        runTask(t, n, r, o) {
            let i = this._inner,
                s = i.scheduleEventTask("NgZoneEvent: " + o, t, Hg, Kr, Kr);
            try {
                return i.runTask(s, n, r)
            } finally {
                i.cancelTask(s)
            }
        }
        runGuarded(t, n, r) {
            return this._inner.runGuarded(t, n, r)
        }
        runOutsideAngular(t) {
            return this._outer.run(t)
        }
    },
    Hg = {};

function ta(e) {
    if (e._nesting == 0 && !e.hasPendingMicrotasks && !e.isStable) try {
        e._nesting++, e.onMicrotaskEmpty.emit(null)
    } finally {
        if (e._nesting--, !e.hasPendingMicrotasks) try {
            e.runOutsideAngular(() => e.onStable.emit(null))
        } finally {
            e.isStable = !0
        }
    }
}

function Ug(e) {
    if (e.isCheckStableRunning || e.callbackScheduled) return;
    e.callbackScheduled = !0;

    function t() {
        td(() => {
            e.callbackScheduled = !1, ss(e), e.isCheckStableRunning = !0, ta(e), e.isCheckStableRunning = !1
        })
    }
    e.scheduleInRootZone ? Zone.root.run(() => {
        t()
    }) : e._outer.run(() => {
        t()
    }), ss(e)
}

function zg(e) {
    let t = () => {
            Ug(e)
        },
        n = $g++;
    e._inner = e._inner.fork({
        name: "angular",
        properties: {
            [ea]: !0,
            [Jr]: n,
            [Jr + n]: !0
        },
        onInvokeTask: (r, o, i, s, a, c) => {
            if (qg(c)) return r.invokeTask(i, s, a, c);
            try {
                return Iu(e), r.invokeTask(i, s, a, c)
            } finally {
                (e.shouldCoalesceEventChangeDetection && s.type === "eventTask" || e.shouldCoalesceRunChangeDetection) && t(), bu(e)
            }
        },
        onInvoke: (r, o, i, s, a, c, u) => {
            try {
                return Iu(e), r.invoke(i, s, a, c, u)
            } finally {
                e.shouldCoalesceRunChangeDetection && !e.callbackScheduled && !Gg(c) && t(), bu(e)
            }
        },
        onHasTask: (r, o, i, s) => {
            r.hasTask(i, s), o === i && (s.change == "microTask" ? (e._hasPendingMicrotasks = s.microTask, ss(e), ta(e)) : s.change == "macroTask" && (e.hasPendingMacrotasks = s.macroTask))
        },
        onHandleError: (r, o, i, s) => (r.handleError(i, s), e.runOutsideAngular(() => e.onError.emit(s)), !1)
    })
}

function ss(e) {
    e._hasPendingMicrotasks || (e.shouldCoalesceEventChangeDetection || e.shouldCoalesceRunChangeDetection) && e.callbackScheduled === !0 ? e.hasPendingMicrotasks = !0 : e.hasPendingMicrotasks = !1
}

function Iu(e) {
    e._nesting++, e.isStable && (e.isStable = !1, e.onUnstable.emit(null))
}

function bu(e) {
    e._nesting--, ta(e)
}
var as = class {
    hasPendingMicrotasks = !1;
    hasPendingMacrotasks = !1;
    isStable = !0;
    onUnstable = new re;
    onMicrotaskEmpty = new re;
    onStable = new re;
    onError = new re;
    run(t, n, r) {
        return t.apply(n, r)
    }
    runGuarded(t, n, r) {
        return t.apply(n, r)
    }
    runOutsideAngular(t) {
        return t()
    }
    runTask(t, n, r, o) {
        return t.apply(n, r)
    }
};

function qg(e) {
    return nd(e, "__ignore_ng_zone__")
}

function Gg(e) {
    return nd(e, "__scheduler_tick__")
}

function nd(e, t) {
    return !Array.isArray(e) || e.length !== 1 ? !1 : e[0]?.data?.[t] === !0
}
var Fe = class {
        _console = console;
        handleError(t) {
            this._console.error("ERROR", t)
        }
    },
    Wg = new D("", {
        providedIn: "root",
        factory: () => {
            let e = g(W),
                t = g(Fe);
            return n => e.runOutsideAngular(() => t.handleError(n))
        }
    });

function Su(e, t) {
    return Ku(e, t)
}

function Zg(e) {
    return Ku(Yu, e)
}
var rd = (Su.required = Zg, Su);

function Qg() {
    return Wt($e(), B())
}

function Wt(e, t) {
    return new On(Ve(e, t))
}
var On = (() => {
    class e {
        nativeElement;
        constructor(n) {
            this.nativeElement = n
        }
        static __NG_ELEMENT_ID__ = Qg
    }
    return e
})();

function Yg(e) {
    return e instanceof On ? e.nativeElement : e
}

function Kg() {
    return this._results[Symbol.iterator]()
}
var cs = class {
    _emitDistinctChangesOnly;
    dirty = !0;
    _onDirty = void 0;
    _results = [];
    _changesDetected = !1;
    _changes = void 0;
    length = 0;
    first = void 0;
    last = void 0;
    get changes() {
        return this._changes ??= new q
    }
    constructor(t = !1) {
        this._emitDistinctChangesOnly = t
    }
    get(t) {
        return this._results[t]
    }
    map(t) {
        return this._results.map(t)
    }
    filter(t) {
        return this._results.filter(t)
    }
    find(t) {
        return this._results.find(t)
    }
    reduce(t, n) {
        return this._results.reduce(t, n)
    }
    forEach(t) {
        this._results.forEach(t)
    }
    some(t) {
        return this._results.some(t)
    }
    toArray() {
        return this._results.slice()
    }
    toString() {
        return this._results.toString()
    }
    reset(t, n) {
        this.dirty = !1;
        let r = Ah(t);
        (this._changesDetected = !Rh(this._results, r, n)) && (this._results = r, this.length = r.length, this.last = r[this.length - 1], this.first = r[0])
    }
    notifyOnChanges() {
        this._changes !== void 0 && (this._changesDetected || !this._emitDistinctChangesOnly) && this._changes.next(this)
    }
    onDirty(t) {
        this._onDirty = t
    }
    setDirty() {
        this.dirty = !0, this._onDirty?.()
    }
    destroy() {
        this._changes !== void 0 && (this._changes.complete(), this._changes.unsubscribe())
    } [Symbol.iterator] = Kg
};

function od(e) {
    return (e.flags & 128) === 128
}
var id = function(e) {
        return e[e.OnPush = 0] = "OnPush", e[e.Default = 1] = "Default", e
    }(id || {}),
    sd = new Map,
    Jg = 0;

function Xg() {
    return Jg++
}

function em(e) {
    sd.set(e[go], e)
}

function us(e) {
    sd.delete(e[go])
}
var Mu = "__ngContext__";

function kn(e, t) {
    st(t) ? (e[Mu] = t[go], em(t)) : e[Mu] = t
}

function ad(e) {
    return ud(e[En])
}

function cd(e) {
    return ud(e[De])
}

function ud(e) {
    for (; e !== null && !je(e);) e = e[De];
    return e
}
var ls;

function ld(e) {
    ls = e
}

function tm() {
    if (ls !== void 0) return ls;
    if (typeof document < "u") return document;
    throw new v(210, !1)
}
var wo = new D("", {
        providedIn: "root",
        factory: () => nm
    }),
    nm = "ng",
    na = new D(""),
    Pn = new D("", {
        providedIn: "platform",
        factory: () => "unknown"
    });
var ra = new D("", {
    providedIn: "root",
    factory: () => tm().body?.querySelector("[ngCspNonce]")?.getAttribute("ngCspNonce") || null
});
var rm = "h",
    om = "b";
var dd = !1,
    im = new D("", {
        providedIn: "root",
        factory: () => dd
    });
var fd = function(e) {
        return e[e.CHANGE_DETECTION = 0] = "CHANGE_DETECTION", e[e.AFTER_NEXT_RENDER = 1] = "AFTER_NEXT_RENDER", e
    }(fd || {}),
    Eo = new D(""),
    _u = new Set;

function Co(e) {
    _u.has(e) || (_u.add(e), performance?.mark?.("mark_feature_usage", {
        detail: {
            feature: e
        }
    }))
}
var sm = (() => {
    class e {
        impl = null;
        execute() {
            this.impl?.execute()
        }
        static \u0275prov = w({
            token: e,
            providedIn: "root",
            factory: () => new e
        })
    }
    return e
})();
var am = () => null;

function pd(e, t, n = !1) {
    return am(e, t, n)
}

function hd(e, t) {
    let n = e.contentQueries;
    if (n !== null) {
        let r = T(null);
        try {
            for (let o = 0; o < n.length; o += 2) {
                let i = n[o],
                    s = n[o + 1];
                if (s !== -1) {
                    let a = e.data[s];
                    Ws(i), a.contentQueries(2, t[s], s)
                }
            }
        } finally {
            T(r)
        }
    }
}

function ds(e, t, n) {
    Ws(0);
    let r = T(null);
    try {
        t(e, n)
    } finally {
        T(r)
    }
}

function gd(e, t, n) {
    if (vl(t)) {
        let r = T(null);
        try {
            let o = t.directiveStart,
                i = t.directiveEnd;
            for (let s = o; s < i; s++) {
                let a = e.data[s];
                if (a.contentQueries) {
                    let c = n[s];
                    a.contentQueries(1, c, s)
                }
            }
        } finally {
            T(r)
        }
    }
}
var Me = function(e) {
    return e[e.Emulated = 0] = "Emulated", e[e.None = 2] = "None", e[e.ShadowDom = 3] = "ShadowDom", e
}(Me || {});
var Xr = class {
    changingThisBreaksApplicationSecurity;
    constructor(t) {
        this.changingThisBreaksApplicationSecurity = t
    }
    toString() {
        return `SafeValue must use [property]=binding: ${this.changingThisBreaksApplicationSecurity} (see ${Qu})`
    }
};

function md(e) {
    return e instanceof Xr ? e.changingThisBreaksApplicationSecurity : e
}

function cm(e, t) {
    let n = um(e);
    if (n != null && n !== t) {
        if (n === "ResourceURL" && t === "URL") return !0;
        throw new Error(`Required a safe ${t}, got a ${n} (see ${Qu})`)
    }
    return n === t
}

function um(e) {
    return e instanceof Xr && e.getTypeName() || null
}
var lm = /^(?!javascript:)(?:[a-z0-9+.-]+:|[^&:\/?#]*(?:[\/?#]|$))/i;

function dm(e) {
    return e = String(e), e.match(lm) ? e : "unsafe:" + e
}
var vd = function(e) {
    return e[e.NONE = 0] = "NONE", e[e.HTML = 1] = "HTML", e[e.STYLE = 2] = "STYLE", e[e.SCRIPT = 3] = "SCRIPT", e[e.URL = 4] = "URL", e[e.RESOURCE_URL = 5] = "RESOURCE_URL", e
}(vd || {});

function yd(e) {
    let t = fm();
    return t ? t.sanitize(vd.URL, e) || "" : cm(e, "URL") ? md(e) : dm(ol(e))
}

function fm() {
    let e = B();
    return e && e[Ae].sanitizer
}

function Dd(e) {
    return e.ownerDocument.defaultView
}

function wd(e) {
    return e instanceof Function ? e() : e
}

function pm(e, t, n) {
    let r = e.length;
    for (;;) {
        let o = e.indexOf(t, n);
        if (o === -1) return o;
        if (o === 0 || e.charCodeAt(o - 1) <= 32) {
            let i = t.length;
            if (o + i === r || e.charCodeAt(o + i) <= 32) return o
        }
        n = o + 1
    }
}
var Ed = "ng-template";

function hm(e, t, n, r) {
    let o = 0;
    if (r) {
        for (; o < t.length && typeof t[o] == "string"; o += 2)
            if (t[o] === "class" && pm(t[o + 1].toLowerCase(), n, 0) !== -1) return !0
    } else if (oa(e)) return !1;
    if (o = t.indexOf(1, o), o > -1) {
        let i;
        for (; ++o < t.length && typeof(i = t[o]) == "string";)
            if (i.toLowerCase() === n) return !0
    }
    return !1
}

function oa(e) {
    return e.type === 4 && e.value !== Ed
}

function gm(e, t, n) {
    let r = e.type === 4 && !n ? Ed : e.value;
    return t === r
}

function mm(e, t, n) {
    let r = 4,
        o = e.attrs,
        i = o !== null ? Dm(o) : 0,
        s = !1;
    for (let a = 0; a < t.length; a++) {
        let c = t[a];
        if (typeof c == "number") {
            if (!s && !ve(r) && !ve(c)) return !1;
            if (s && ve(c)) continue;
            s = !1, r = c | r & 1;
            continue
        }
        if (!s)
            if (r & 4) {
                if (r = 2 | r & 1, c !== "" && !gm(e, c, n) || c === "" && t.length === 1) {
                    if (ve(r)) return !1;
                    s = !0
                }
            } else if (r & 8) {
            if (o === null || !hm(e, o, c, n)) {
                if (ve(r)) return !1;
                s = !0
            }
        } else {
            let u = t[++a],
                l = vm(c, o, oa(e), n);
            if (l === -1) {
                if (ve(r)) return !1;
                s = !0;
                continue
            }
            if (u !== "") {
                let f;
                if (l > i ? f = "" : f = o[l + 1].toLowerCase(), r & 2 && u !== f) {
                    if (ve(r)) return !1;
                    s = !0
                }
            }
        }
    }
    return ve(r) || s
}

function ve(e) {
    return (e & 1) === 0
}

function vm(e, t, n, r) {
    if (t === null) return -1;
    let o = 0;
    if (r || !n) {
        let i = !1;
        for (; o < t.length;) {
            let s = t[o];
            if (s === e) return o;
            if (s === 3 || s === 6) i = !0;
            else if (s === 1 || s === 2) {
                let a = t[++o];
                for (; typeof a == "string";) a = t[++o];
                continue
            } else {
                if (s === 4) break;
                if (s === 0) {
                    o += 4;
                    continue
                }
            }
            o += i ? 1 : 2
        }
        return -1
    } else return wm(t, e)
}

function ym(e, t, n = !1) {
    for (let r = 0; r < t.length; r++)
        if (mm(e, t[r], n)) return !0;
    return !1
}

function Dm(e) {
    for (let t = 0; t < e.length; t++) {
        let n = e[t];
        if (Tg(n)) return t
    }
    return e.length
}

function wm(e, t) {
    let n = e.indexOf(4);
    if (n > -1)
        for (n++; n < e.length;) {
            let r = e[n];
            if (typeof r == "number") return -1;
            if (r === t) return n;
            n++
        }
    return -1
}

function Tu(e, t) {
    return e ? ":not(" + t.trim() + ")" : t
}

function Em(e) {
    let t = e[0],
        n = 1,
        r = 2,
        o = "",
        i = !1;
    for (; n < e.length;) {
        let s = e[n];
        if (typeof s == "string")
            if (r & 2) {
                let a = e[++n];
                o += "[" + s + (a.length > 0 ? '="' + a + '"' : "") + "]"
            } else r & 8 ? o += "." + s : r & 4 && (o += " " + s);
        else o !== "" && !ve(s) && (t += Tu(i, o), o = ""), r = s, i = i || !ve(r);
        n++
    }
    return o !== "" && (t += Tu(i, o)), t
}

function Cm(e) {
    return e.map(Em).join(",")
}

function Im(e) {
    let t = [],
        n = [],
        r = 1,
        o = 2;
    for (; r < e.length;) {
        let i = e[r];
        if (typeof i == "string") o === 2 ? i !== "" && t.push(i, e[++r]) : o === 8 && n.push(i);
        else {
            if (!ve(o)) break;
            o = i
        }
        r++
    }
    return n.length && t.push(1, ...n), t
}
var Io = {};

function Cd(e, t, n) {
    return e.createElement(t, n)
}

function eo(e, t, n, r, o) {
    e.insertBefore(t, n, r, o)
}

function Id(e, t, n) {
    e.appendChild(t, n)
}

function Nu(e, t, n, r, o) {
    r !== null ? eo(e, t, n, r, o) : Id(e, t, n)
}

function bm(e, t, n) {
    e.removeChild(null, t, n)
}

function Sm(e, t, n) {
    e.setAttribute(t, "style", n)
}

function Mm(e, t, n) {
    n === "" ? e.removeAttribute(t, "class") : e.setAttribute(t, "class", n)
}

function bd(e, t, n) {
    let {
        mergedAttrs: r,
        classes: o,
        styles: i
    } = n;
    r !== null && _g(e, t, r), o !== null && Mm(e, t, o), i !== null && Sm(e, t, i)
}

function ia(e, t, n, r, o, i, s, a, c, u, l) {
    let f = ke + r,
        p = f + o,
        d = _m(f, p),
        h = typeof u == "function" ? u() : u;
    return d[M] = {
        type: e,
        blueprint: d,
        template: n,
        queries: null,
        viewQuery: a,
        declTNode: t,
        data: d.slice().fill(null, f),
        bindingStartIndex: f,
        expandoStartIndex: p,
        hostBindingOpCodes: null,
        firstCreatePass: !0,
        firstUpdatePass: !0,
        staticViewQueries: !1,
        staticContentQueries: !1,
        preOrderHooks: null,
        preOrderCheckHooks: null,
        contentHooks: null,
        contentCheckHooks: null,
        viewHooks: null,
        viewCheckHooks: null,
        destroyHooks: null,
        cleanup: null,
        contentQueries: null,
        components: null,
        directiveRegistry: typeof i == "function" ? i() : i,
        pipeRegistry: typeof s == "function" ? s() : s,
        firstChild: null,
        schemas: c,
        consts: h,
        incompleteFirstPass: !1,
        ssrId: l
    }
}

function _m(e, t) {
    let n = [];
    for (let r = 0; r < t; r++) n.push(r < e ? null : Io);
    return n
}

function Tm(e) {
    let t = e.tView;
    return t === null || t.incompleteFirstPass ? e.tView = ia(1, null, e.template, e.decls, e.vars, e.directiveDefs, e.pipeDefs, e.viewQuery, e.schemas, e.consts, e.id) : t
}

function sa(e, t, n, r, o, i, s, a, c, u, l) {
    let f = t.blueprint.slice();
    return f[Le] = o, f[I] = r | 4 | 128 | 8 | 64 | 1024, (u !== null || e && e[I] & 2048) && (f[I] |= 2048), Cl(f), f[X] = f[An] = e, f[K] = n, f[Ae] = s || e && e[Ae], f[se] = a || e && e[se], f[ct] = c || e && e[ct] || null, f[Ce] = i, f[go] = Xg(), f[wn] = l, f[gl] = u, f[we] = t.type == 2 ? e[we] : f, f
}

function Nm(e, t, n) {
    let r = Ve(t, e),
        o = Tm(n),
        i = e[Ae].rendererFactory,
        s = aa(e, sa(e, o, null, Sd(n), r, t, null, i.createRenderer(r, n), null, null, null));
    return e[t.index] = s
}

function Sd(e) {
    let t = 16;
    return e.signals ? t = 4096 : e.onPush && (t = 64), t
}

function Md(e, t, n, r) {
    if (n === 0) return -1;
    let o = t.length;
    for (let i = 0; i < n; i++) t.push(r), e.blueprint.push(r), e.data.push(null);
    return o
}

function aa(e, t) {
    return e[En] ? e[pu][De] = t : e[En] = t, e[pu] = t, t
}

function bo(e = 1) {
    _d(Be(), B(), qt() + e, !1)
}

function _d(e, t, n, r) {
    if (!r)
        if ((t[I] & 3) === 3) {
            let i = e.preOrderCheckHooks;
            i !== null && kr(t, i, n)
        } else {
            let i = e.preOrderHooks;
            i !== null && Pr(t, i, 0, n)
        } ft(n)
}
var So = function(e) {
    return e[e.None = 0] = "None", e[e.SignalBased = 1] = "SignalBased", e[e.HasDecoratorInputTransform = 2] = "HasDecoratorInputTransform", e
}(So || {});

function fs(e, t, n, r) {
    let o = T(null);
    try {
        let [i, s, a] = e.inputs[n], c = null;
        (s & So.SignalBased) !== 0 && (c = t[i][Et]), c !== null && c.transformFn !== void 0 ? r = c.transformFn(r) : a !== null && (r = a.call(t, r)), e.setInput !== null ? e.setInput(t, c, r, n, i) : yl(t, c, i, r)
    } finally {
        T(o)
    }
}

function Td(e, t, n, r, o) {
    let i = qt(),
        s = r & 2;
    try {
        ft(-1), s && t.length > ke && _d(e, t, ke, !1), V(s ? 2 : 0, o), n(r, o)
    } finally {
        ft(i), V(s ? 3 : 1, o)
    }
}

function ca(e, t, n) {
    Fm(e, t, n), (n.flags & 64) === 64 && Lm(e, t, n)
}

function Nd(e, t, n = Ve) {
    let r = t.localNames;
    if (r !== null) {
        let o = t.index + 1;
        for (let i = 0; i < r.length; i += 2) {
            let s = r[i + 1],
                a = s === -1 ? n(t, e) : e[s];
            e[o++] = a
        }
    }
}

function xm(e, t, n, r) {
    let i = r.get(im, dd) || n === Me.ShadowDom,
        s = e.selectRootElement(t, i);
    return Rm(s), s
}

function Rm(e) {
    Am(e)
}
var Am = () => null;

function Om(e) {
    return e === "class" ? "className" : e === "for" ? "htmlFor" : e === "formaction" ? "formAction" : e === "innerHtml" ? "innerHTML" : e === "readonly" ? "readOnly" : e === "tabindex" ? "tabIndex" : e
}

function km(e, t, n, r, o, i, s, a) {
    if (!a && ua(t, e, n, r, o)) {
        Ut(t) && Pm(n, t.index);
        return
    }
    if (t.type & 3) {
        let c = Ve(t, n);
        r = Om(r), o = s != null ? s(o, t.value || "", r) : o, i.setProperty(c, r, o)
    } else t.type & 12
}

function Pm(e, t) {
    let n = Pe(t, e);
    n[I] & 16 || (n[I] |= 64)
}

function Fm(e, t, n) {
    let r = n.directiveStart,
        o = n.directiveEnd;
    Ut(n) && Nm(t, n, e.data[r + n.componentOffset]), e.firstCreatePass || zl(n, t);
    let i = n.initialInputs;
    for (let s = r; s < o; s++) {
        let a = e.data[s],
            c = Yr(t, e, s, n);
        if (kn(c, t), i !== null && Vm(t, s - r, c, a, n, i), gt(a)) {
            let u = Pe(n.index, t);
            u[K] = Yr(t, e, s, n)
        }
    }
}

function Lm(e, t, n) {
    let r = n.directiveStart,
        o = n.directiveEnd,
        i = n.index,
        s = yg();
    try {
        ft(i);
        for (let a = r; a < o; a++) {
            let c = e.data[a],
                u = t[a];
            ts(a), (c.hostBindings !== null || c.hostVars !== 0 || c.hostAttrs !== null) && jm(c, u)
        }
    } finally {
        ft(-1), ts(s)
    }
}

function jm(e, t) {
    e.hostBindings !== null && e.hostBindings(1, t)
}

function xd(e, t) {
    let n = e.directiveRegistry,
        r = null;
    if (n)
        for (let o = 0; o < n.length; o++) {
            let i = n[o];
            ym(t, i.selectors, !1) && (r ??= [], gt(i) ? r.unshift(i) : r.push(i))
        }
    return r
}

function Vm(e, t, n, r, o, i) {
    let s = i[t];
    if (s !== null)
        for (let a = 0; a < s.length; a += 2) {
            let c = s[a],
                u = s[a + 1];
            fs(r, n, c, u)
        }
}

function Bm(e, t) {
    let n = e[ct],
        r = n ? n.get(Fe, null) : null;
    r && r.handleError(t)
}

function ua(e, t, n, r, o) {
    let i = e.inputs?.[r],
        s = e.hostDirectiveInputs?.[r],
        a = !1;
    if (s)
        for (let c = 0; c < s.length; c += 2) {
            let u = s[c],
                l = s[c + 1],
                f = t.data[u];
            fs(f, n[u], l, o), a = !0
        }
    if (i)
        for (let c of i) {
            let u = n[c],
                l = t.data[c];
            fs(l, u, r, o), a = !0
        }
    return a
}

function $m(e, t) {
    let n = Pe(t, e),
        r = n[M];
    Hm(r, n);
    let o = n[Le];
    o !== null && n[wn] === null && (n[wn] = pd(o, n[ct])), V(18), la(r, n, n[K]), V(19, n[K])
}

function Hm(e, t) {
    for (let n = t.length; n < e.blueprint.length; n++) t.push(e.blueprint[n])
}

function la(e, t, n) {
    Zs(t);
    try {
        let r = e.viewQuery;
        r !== null && ds(1, r, n);
        let o = e.template;
        o !== null && Td(e, t, o, 1, n), e.firstCreatePass && (e.firstCreatePass = !1), t[Oe]?.finishViewCreation(e), e.staticContentQueries && hd(e, t), e.staticViewQueries && ds(2, e.viewQuery, n);
        let i = e.components;
        i !== null && Um(t, i)
    } catch (r) {
        throw e.firstCreatePass && (e.incompleteFirstPass = !0, e.firstCreatePass = !1), r
    } finally {
        t[I] &= -5, Qs()
    }
}

function Um(e, t) {
    for (let n = 0; n < t.length; n++) $m(e, t[n])
}

function da(e, t, n, r) {
    let o = T(null);
    try {
        let i = t.tView,
            a = e[I] & 4096 ? 4096 : 16,
            c = sa(e, i, n, a, null, t, null, null, r?.injector ?? null, r?.embeddedViewInjector ?? null, r?.dehydratedView ?? null),
            u = e[t.index];
        c[ut] = u;
        let l = e[Oe];
        return l !== null && (c[Oe] = l.createEmbeddedView(i)), la(i, c, n), c
    } finally {
        T(o)
    }
}

function to(e, t) {
    return !t || t.firstChild === null || od(e)
}
var zm;

function fa(e, t) {
    return zm(e, t)
}
var Ke = function(e) {
    return e[e.Important = 1] = "Important", e[e.DashCase = 2] = "DashCase", e
}(Ke || {});

function Rd(e) {
    return (e.flags & 32) === 32
}

function Pt(e, t, n, r, o) {
    if (r != null) {
        let i, s = !1;
        je(r) ? i = r : st(r) && (s = !0, r = r[Le]);
        let a = Se(r);
        e === 0 && n !== null ? o == null ? Id(t, n, a) : eo(t, n, a, o || null, !0) : e === 1 && n !== null ? eo(t, n, a, o || null, !0) : e === 2 ? bm(t, a, s) : e === 3 && t.destroyNode(a), i != null && nv(t, e, i, n, o)
    }
}

function qm(e, t) {
    Ad(e, t), t[Le] = null, t[Ce] = null
}

function Gm(e, t, n, r, o, i) {
    r[Le] = o, r[Ce] = t, _o(e, r, n, 1, o, i)
}

function Ad(e, t) {
    t[Ae].changeDetectionScheduler?.notify(9), _o(e, t, t[se], 2, null, null)
}

function Wm(e) {
    let t = e[En];
    if (!t) return Bi(e[M], e);
    for (; t;) {
        let n = null;
        if (st(t)) n = t[En];
        else {
            let r = t[J];
            r && (n = r)
        }
        if (!n) {
            for (; t && !t[De] && t !== e;) st(t) && Bi(t[M], t), t = t[X];
            t === null && (t = e), st(t) && Bi(t[M], t), n = t && t[De]
        }
        t = n
    }
}

function pa(e, t) {
    let n = e[Bt],
        r = n.indexOf(t);
    n.splice(r, 1)
}

function Mo(e, t) {
    if (zt(t)) return;
    let n = t[se];
    n.destroyNode && _o(e, t, n, 3, null, null), Wm(t)
}

function Bi(e, t) {
    if (zt(t)) return;
    let n = T(null);
    try {
        t[I] &= -129, t[I] |= 256, t[de] && gi(t[de]), Qm(e, t), Zm(e, t), t[M].type === 1 && t[se].destroy();
        let r = t[ut];
        if (r !== null && je(t[X])) {
            r !== t[X] && pa(r, t);
            let o = t[Oe];
            o !== null && o.detachView(e)
        }
        us(t)
    } finally {
        T(n)
    }
}

function Zm(e, t) {
    let n = e.cleanup,
        r = t[zr];
    if (n !== null)
        for (let s = 0; s < n.length - 1; s += 2)
            if (typeof n[s] == "string") {
                let a = n[s + 3];
                a >= 0 ? r[a]() : r[-a].unsubscribe(), s += 2
            } else {
                let a = r[n[s + 1]];
                n[s].call(a)
            } r !== null && (t[zr] = null);
    let o = t[Qe];
    if (o !== null) {
        t[Qe] = null;
        for (let s = 0; s < o.length; s++) {
            let a = o[s];
            a()
        }
    }
    let i = t[qr];
    if (i !== null) {
        t[qr] = null;
        for (let s of i) s.destroy()
    }
}

function Qm(e, t) {
    let n;
    if (e != null && (n = e.destroyHooks) != null)
        for (let r = 0; r < n.length; r += 2) {
            let o = t[n[r]];
            if (!(o instanceof In)) {
                let i = n[r + 1];
                if (Array.isArray(i))
                    for (let s = 0; s < i.length; s += 2) {
                        let a = o[i[s]],
                            c = i[s + 1];
                        V(4, a, c);
                        try {
                            c.call(a)
                        } finally {
                            V(5, a, c)
                        }
                    } else {
                        V(4, o, i);
                        try {
                            i.call(o)
                        } finally {
                            V(5, o, i)
                        }
                    }
            }
        }
}

function Ym(e, t, n) {
    return Km(e, t.parent, n)
}

function Km(e, t, n) {
    let r = t;
    for (; r !== null && r.type & 168;) t = r, r = t.parent;
    if (r === null) return n[Le];
    if (Ut(r)) {
        let {
            encapsulation: o
        } = e.data[r.directiveStart + r.componentOffset];
        if (o === Me.None || o === Me.Emulated) return null
    }
    return Ve(r, n)
}

function Jm(e, t, n) {
    return ev(e, t, n)
}

function Xm(e, t, n) {
    return e.type & 40 ? Ve(e, n) : null
}
var ev = Xm,
    xu;

function Od(e, t, n, r) {
    let o = Ym(e, r, t),
        i = t[se],
        s = r.parent || t[Ce],
        a = Jm(s, r, t);
    if (o != null)
        if (Array.isArray(n))
            for (let c = 0; c < n.length; c++) Nu(i, o, n[c], a, !1);
        else Nu(i, o, n, a, !1);
    xu !== void 0 && xu(i, r, t, n, o)
}

function mn(e, t) {
    if (t !== null) {
        let n = t.type;
        if (n & 3) return Ve(t, e);
        if (n & 4) return ps(-1, e[t.index]);
        if (n & 8) {
            let r = t.child;
            if (r !== null) return mn(e, r);
            {
                let o = e[t.index];
                return je(o) ? ps(-1, o) : Se(o)
            }
        } else {
            if (n & 128) return mn(e, t.next);
            if (n & 32) return fa(t, e)() || Se(e[t.index]);
            {
                let r = kd(e, t);
                if (r !== null) {
                    if (Array.isArray(r)) return r[0];
                    let o = dt(e[we]);
                    return mn(o, r)
                } else return mn(e, t.next)
            }
        }
    }
    return null
}

function kd(e, t) {
    if (t !== null) {
        let r = e[we][Ce],
            o = t.projection;
        return r.projection[o]
    }
    return null
}

function ps(e, t) {
    let n = J + e + 1;
    if (n < t.length) {
        let r = t[n],
            o = r[M].firstChild;
        if (o !== null) return mn(r, o)
    }
    return t[lt]
}

function ha(e, t, n, r, o, i, s) {
    for (; n != null;) {
        if (n.type === 128) {
            n = n.next;
            continue
        }
        let a = r[n.index],
            c = n.type;
        if (s && t === 0 && (a && kn(Se(a), r), n.flags |= 2), !Rd(n))
            if (c & 8) ha(e, t, n.child, r, o, i, !1), Pt(t, e, o, a, i);
            else if (c & 32) {
            let u = fa(n, r),
                l;
            for (; l = u();) Pt(t, e, o, l, i);
            Pt(t, e, o, a, i)
        } else c & 16 ? tv(e, t, r, n, o, i) : Pt(t, e, o, a, i);
        n = s ? n.projectionNext : n.next
    }
}

function _o(e, t, n, r, o, i) {
    ha(n, r, e.firstChild, t, o, i, !1)
}

function tv(e, t, n, r, o, i) {
    let s = n[we],
        c = s[Ce].projection[r.projection];
    if (Array.isArray(c))
        for (let u = 0; u < c.length; u++) {
            let l = c[u];
            Pt(t, e, o, l, i)
        } else {
            let u = c,
                l = s[X];
            od(r) && (u.flags |= 128), ha(e, t, u, l, o, i, !0)
        }
}

function nv(e, t, n, r, o) {
    let i = n[lt],
        s = Se(n);
    i !== s && Pt(t, e, r, i, o);
    for (let a = J; a < n.length; a++) {
        let c = n[a];
        _o(c[M], c, e, t, r, i)
    }
}

function rv(e, t, n, r, o) {
    if (t) o ? e.addClass(n, r) : e.removeClass(n, r);
    else {
        let i = r.indexOf("-") === -1 ? void 0 : Ke.DashCase;
        o == null ? e.removeStyle(n, r, i) : (typeof o == "string" && o.endsWith("!important") && (o = o.slice(0, -10), i |= Ke.Important), e.setStyle(n, r, o, i))
    }
}

function no(e, t, n, r, o = !1) {
    for (; n !== null;) {
        if (n.type === 128) {
            n = o ? n.projectionNext : n.next;
            continue
        }
        let i = t[n.index];
        i !== null && r.push(Se(i)), je(i) && ov(i, r);
        let s = n.type;
        if (s & 8) no(e, t, n.child, r);
        else if (s & 32) {
            let a = fa(n, t),
                c;
            for (; c = a();) r.push(c)
        } else if (s & 16) {
            let a = kd(t, n);
            if (Array.isArray(a)) r.push(...a);
            else {
                let c = dt(t[we]);
                no(c[M], c, a, r, !0)
            }
        }
        n = o ? n.projectionNext : n.next
    }
    return r
}

function ov(e, t) {
    for (let n = J; n < e.length; n++) {
        let r = e[n],
            o = r[M].firstChild;
        o !== null && no(r[M], r, o, t)
    }
    e[lt] !== e[Le] && t.push(e[lt])
}

function Pd(e) {
    if (e[Li] !== null) {
        for (let t of e[Li]) t.impl.addSequence(t);
        e[Li].length = 0
    }
}
var Fd = [];

function iv(e) {
    return e[de] ?? sv(e)
}

function sv(e) {
    let t = Fd.pop() ?? Object.create(cv);
    return t.lView = e, t
}

function av(e) {
    e.lView[de] !== e && (e.lView = null, Fd.push(e))
}
var cv = O(m({}, cr), {
    consumerIsAlwaysLive: !0,
    kind: "template",
    consumerMarkedDirty: e => {
        vo(e.lView)
    },
    consumerOnSignalRead() {
        this.lView[de] = this
    }
});

function uv(e) {
    let t = e[de] ?? Object.create(lv);
    return t.lView = e, t
}
var lv = O(m({}, cr), {
    consumerIsAlwaysLive: !0,
    kind: "template",
    consumerMarkedDirty: e => {
        let t = dt(e.lView);
        for (; t && !Ld(t[M]);) t = dt(t);
        t && Il(t)
    },
    consumerOnSignalRead() {
        this.lView[de] = this
    }
});

function Ld(e) {
    return e.type !== 2
}

function jd(e) {
    if (e[qr] === null) return;
    let t = !0;
    for (; t;) {
        let n = !1;
        for (let r of e[qr]) r.dirty && (n = !0, r.zone === null || Zone.current === r.zone ? r.run() : r.zone.run(() => r.run()));
        t = n && !!(e[I] & 8192)
    }
}
var dv = 100;

function Vd(e, t = !0, n = 0) {
    let o = e[Ae].rendererFactory,
        i = !1;
    i || o.begin?.();
    try {
        fv(e, n)
    } catch (s) {
        throw t && Bm(e, s), s
    } finally {
        i || o.end?.()
    }
}

function fv(e, t) {
    let n = Tl();
    try {
        gu(!0), hs(e, t);
        let r = 0;
        for (; mo(e);) {
            if (r === dv) throw new v(103, !1);
            r++, hs(e, 1)
        }
    } finally {
        gu(n)
    }
}

function pv(e, t, n, r) {
    if (zt(t)) return;
    let o = t[I],
        i = !1,
        s = !1;
    Zs(t);
    let a = !0,
        c = null,
        u = null;
    i || (Ld(e) ? (u = iv(t), c = pi(u)) : li() === null ? (a = !1, u = uv(t), c = pi(u)) : t[de] && (gi(t[de]), t[de] = null));
    try {
        Cl(t), hg(e.bindingStartIndex), n !== null && Td(e, t, n, 2, r);
        let l = (o & 3) === 3;
        if (!i)
            if (l) {
                let d = e.preOrderCheckHooks;
                d !== null && kr(t, d, null)
            } else {
                let d = e.preOrderHooks;
                d !== null && Pr(t, d, 0, null), ji(t, 0)
            } if (s || hv(t), jd(t), Bd(t, 0), e.contentQueries !== null && hd(e, t), !i)
            if (l) {
                let d = e.contentCheckHooks;
                d !== null && kr(t, d)
            } else {
                let d = e.contentHooks;
                d !== null && Pr(t, d, 1), ji(t, 1)
            } mv(e, t);
        let f = e.components;
        f !== null && Hd(t, f, 0);
        let p = e.viewQuery;
        if (p !== null && ds(2, p, r), !i)
            if (l) {
                let d = e.viewCheckHooks;
                d !== null && kr(t, d)
            } else {
                let d = e.viewHooks;
                d !== null && Pr(t, d, 2), ji(t, 2)
            } if (e.firstUpdatePass === !0 && (e.firstUpdatePass = !1), t[Fi]) {
            for (let d of t[Fi]) d();
            t[Fi] = null
        }
        i || (Pd(t), t[I] &= -73)
    } catch (l) {
        throw i || vo(t), l
    } finally {
        u !== null && (Mc(u, c), a && av(u)), Qs()
    }
}

function Bd(e, t) {
    for (let n = ad(e); n !== null; n = cd(n))
        for (let r = J; r < n.length; r++) {
            let o = n[r];
            $d(o, t)
        }
}

function hv(e) {
    for (let t = ad(e); t !== null; t = cd(t)) {
        if (!(t[I] & 2)) continue;
        let n = t[Bt];
        for (let r = 0; r < n.length; r++) {
            let o = n[r];
            Il(o)
        }
    }
}

function gv(e, t, n) {
    V(18);
    let r = Pe(t, e);
    $d(r, n), V(19, r[K])
}

function $d(e, t) {
    zs(e) && hs(e, t)
}

function hs(e, t) {
    let r = e[M],
        o = e[I],
        i = e[de],
        s = !!(t === 0 && o & 16);
    if (s ||= !!(o & 64 && t === 0), s ||= !!(o & 1024), s ||= !!(i?.dirty && hi(i)), s ||= !1, i && (i.dirty = !1), e[I] &= -9217, s) pv(r, e, r.template, e[K]);
    else if (o & 8192) {
        jd(e), Bd(e, 1);
        let a = r.components;
        a !== null && Hd(e, a, 1), Pd(e)
    }
}

function Hd(e, t, n) {
    for (let r = 0; r < t.length; r++) gv(e, t[r], n)
}

function mv(e, t) {
    let n = e.hostBindingOpCodes;
    if (n !== null) try {
        for (let r = 0; r < n.length; r++) {
            let o = n[r];
            if (o < 0) ft(~o);
            else {
                let i = o,
                    s = n[++r],
                    a = n[++r];
                vg(s, i);
                let c = t[i];
                V(24, c), a(2, c), V(25, c)
            }
        }
    } finally {
        ft(-1)
    }
}

function ga(e, t) {
    let n = Tl() ? 64 : 1088;
    for (e[Ae].changeDetectionScheduler?.notify(t); e;) {
        e[I] |= n;
        let r = dt(e);
        if (Wr(e) && !r) return e;
        e = r
    }
    return null
}

function Ud(e, t, n, r) {
    return [e, !0, 0, t, null, r, null, n, null, null]
}

function vv(e, t) {
    let n = J + t;
    if (n < e.length) return e[n]
}

function ma(e, t, n, r = !0) {
    let o = t[M];
    if (Dv(o, t, e, n), r) {
        let s = ps(n, e),
            a = t[se],
            c = a.parentNode(e[lt]);
        c !== null && Gm(o, e[Ce], a, t, c, s)
    }
    let i = t[wn];
    i !== null && i.firstChild !== null && (i.firstChild = null)
}

function yv(e, t) {
    let n = Sn(e, t);
    return n !== void 0 && Mo(n[M], n), n
}

function Sn(e, t) {
    if (e.length <= J) return;
    let n = J + t,
        r = e[n];
    if (r) {
        let o = r[ut];
        o !== null && o !== e && pa(o, r), t > 0 && (e[n - 1][De] = r[De]);
        let i = Hr(e, J + t);
        qm(r[M], r);
        let s = i[Oe];
        s !== null && s.detachView(i[M]), r[X] = null, r[De] = null, r[I] &= -129
    }
    return r
}

function Dv(e, t, n, r) {
    let o = J + r,
        i = n.length;
    r > 0 && (n[o - 1][De] = t), r < i - J ? (t[De] = n[o], cl(n, J + r, t)) : (n.push(t), t[De] = null), t[X] = n;
    let s = t[ut];
    s !== null && n !== s && zd(s, t);
    let a = t[Oe];
    a !== null && a.insertView(e), Xi(t), t[I] |= 128
}

function zd(e, t) {
    let n = e[Bt],
        r = t[X];
    if (st(r)) e[I] |= 2;
    else {
        let o = r[X][we];
        t[we] !== o && (e[I] |= 2)
    }
    n === null ? e[Bt] = [t] : n.push(t)
}
var Mn = class {
    _lView;
    _cdRefInjectingView;
    notifyErrorHandler;
    _appRef = null;
    _attachedToViewContainer = !1;
    get rootNodes() {
        let t = this._lView,
            n = t[M];
        return no(n, t, n.firstChild, [])
    }
    constructor(t, n, r = !0) {
        this._lView = t, this._cdRefInjectingView = n, this.notifyErrorHandler = r
    }
    get context() {
        return this._lView[K]
    }
    set context(t) {
        this._lView[K] = t
    }
    get destroyed() {
        return zt(this._lView)
    }
    destroy() {
        if (this._appRef) this._appRef.detachView(this);
        else if (this._attachedToViewContainer) {
            let t = this._lView[X];
            if (je(t)) {
                let n = t[Gr],
                    r = n ? n.indexOf(this) : -1;
                r > -1 && (Sn(t, r), Hr(n, r))
            }
            this._attachedToViewContainer = !1
        }
        Mo(this._lView[M], this._lView)
    }
    onDestroy(t) {
        bl(this._lView, t)
    }
    markForCheck() {
        ga(this._cdRefInjectingView || this._lView, 4)
    }
    detach() {
        this._lView[I] &= -129
    }
    reattach() {
        Xi(this._lView), this._lView[I] |= 128
    }
    detectChanges() {
        this._lView[I] |= 1024, Vd(this._lView, this.notifyErrorHandler)
    }
    checkNoChanges() {}
    attachToViewContainerRef() {
        if (this._appRef) throw new v(902, !1);
        this._attachedToViewContainer = !0
    }
    detachFromAppRef() {
        this._appRef = null;
        let t = Wr(this._lView),
            n = this._lView[ut];
        n !== null && !t && pa(n, this._lView), Ad(this._lView[M], this._lView)
    }
    attachToAppRef(t) {
        if (this._attachedToViewContainer) throw new v(902, !1);
        this._appRef = t;
        let n = Wr(this._lView),
            r = this._lView[ut];
        r !== null && !n && zd(r, this._lView), Xi(this._lView)
    }
};
var _n = (() => {
        class e {
            static __NG_ELEMENT_ID__ = Cv
        }
        return e
    })(),
    wv = _n,
    Ev = class extends wv {
        _declarationLView;
        _declarationTContainer;
        elementRef;
        constructor(t, n, r) {
            super(), this._declarationLView = t, this._declarationTContainer = n, this.elementRef = r
        }
        get ssrId() {
            return this._declarationTContainer.tView?.ssrId || null
        }
        createEmbeddedView(t, n) {
            return this.createEmbeddedViewImpl(t, n)
        }
        createEmbeddedViewImpl(t, n, r) {
            let o = da(this._declarationLView, this._declarationTContainer, t, {
                embeddedViewInjector: n,
                dehydratedView: r
            });
            return new Mn(o)
        }
    };

function Cv() {
    return va($e(), B())
}

function va(e, t) {
    return e.type & 4 ? new Ev(t, e, Wt(e, t)) : null
}

function qd(e, t, n, r, o) {
    let i = e.data[t];
    if (i === null) i = Iv(e, t, n, r, o), mg() && (i.flags |= 32);
    else if (i.type & 64) {
        i.type = n, i.value = r, i.attrs = o;
        let s = fg();
        i.injectorIndex = s === null ? -1 : s.injectorIndex
    }
    return yo(i, !0), i
}

function Iv(e, t, n, r, o) {
    let i = Ml(),
        s = _l(),
        a = s ? i : i && i.parent,
        c = e.data[t] = Sv(e, a, n, t, r, o);
    return bv(e, c, i, s), c
}

function bv(e, t, n, r) {
    e.firstChild === null && (e.firstChild = t), n !== null && (r ? n.child == null && t.parent !== null && (n.child = t) : n.next === null && (n.next = t, t.prev = n))
}

function Sv(e, t, n, r, o, i) {
    let s = t ? t.injectorIndex : -1,
        a = 0;
    return ug() && (a |= 128), {
        type: n,
        index: r,
        insertBeforeIndex: null,
        injectorIndex: s,
        directiveStart: -1,
        directiveEnd: -1,
        directiveStylingLast: -1,
        componentOffset: -1,
        propertyBindings: null,
        flags: a,
        providerIndexes: 0,
        value: o,
        attrs: i,
        mergedAttrs: null,
        localNames: null,
        initialInputs: null,
        inputs: null,
        hostDirectiveInputs: null,
        outputs: null,
        hostDirectiveOutputs: null,
        directiveToIndex: null,
        tView: null,
        next: null,
        prev: null,
        projectionNext: null,
        child: null,
        parent: t,
        projection: null,
        styles: null,
        stylesWithoutHost: null,
        residualStyles: void 0,
        classes: null,
        classesWithoutHost: null,
        residualClasses: void 0,
        classBindings: 0,
        styleBindings: 0
    }
}
var l_ = new RegExp(`^(\\d+)*(${om}|${rm})*(.*)`);
var Mv = () => null;

function ro(e, t) {
    return Mv(e, t)
}
var _v = class {},
    Gd = class {},
    gs = class {
        resolveComponentFactory(t) {
            throw Error(`No component factory found for ${oe(t)}.`)
        }
    },
    To = class {
        static NULL = new gs
    },
    $t = class {};
var Tv = (() => {
    class e {
        static \u0275prov = w({
            token: e,
            providedIn: "root",
            factory: () => null
        })
    }
    return e
})();
var $i = {},
    ms = class {
        injector;
        parentInjector;
        constructor(t, n) {
            this.injector = t, this.parentInjector = n
        }
        get(t, n, r) {
            r = po(r);
            let o = this.injector.get(t, $i, r);
            return o !== $i || n === $i ? o : this.parentInjector.get(t, n, r)
        }
    };

function Ru(e, t, n) {
    let r = n ? e.styles : null,
        o = n ? e.classes : null,
        i = 0;
    if (t !== null)
        for (let s = 0; s < t.length; s++) {
            let a = t[s];
            if (typeof a == "number") i = a;
            else if (i == 1) o = su(o, a);
            else if (i == 2) {
                let c = a,
                    u = t[++s];
                r = su(r, c + ": " + u + ";")
            }
        }
    n ? e.styles = r : e.stylesWithoutHost = r, n ? e.classes = o : e.classesWithoutHost = o
}

function Wd(e, t = b.Default) {
    let n = B();
    if (n === null) return _(e, t);
    let r = $e();
    return Zl(r, n, le(e), t)
}

function Zd(e, t, n, r, o) {
    let i = r === null ? null : {
            "": -1
        },
        s = o(e, n);
    if (s !== null) {
        let a, c = null,
            u = null,
            l = xv(s);
        l === null ? a = s : [a, c, u] = l, Ov(e, t, n, a, i, c, u)
    }
    i !== null && r !== null && Nv(n, r, i)
}

function Nv(e, t, n) {
    let r = e.localNames = [];
    for (let o = 0; o < t.length; o += 2) {
        let i = n[t[o + 1]];
        if (i == null) throw new v(-301, !1);
        r.push(t[o], i)
    }
}

function xv(e) {
    let t = null,
        n = !1;
    for (let s = 0; s < e.length; s++) {
        let a = e[s];
        if (s === 0 && gt(a) && (t = a), a.findHostDirectiveDefs !== null) {
            n = !0;
            break
        }
    }
    if (!n) return null;
    let r = null,
        o = null,
        i = null;
    for (let s of e) s.findHostDirectiveDefs !== null && (r ??= [], o ??= new Map, i ??= new Map, Rv(s, r, i, o)), s === t && (r ??= [], r.push(s));
    return r !== null ? (r.push(...t === null ? e : e.slice(1)), [r, o, i]) : null
}

function Rv(e, t, n, r) {
    let o = t.length;
    e.findHostDirectiveDefs(e, t, r), n.set(e, [o, t.length - 1])
}

function Av(e, t, n) {
    t.componentOffset = n, (e.components ??= []).push(t.index)
}

function Ov(e, t, n, r, o, i, s) {
    let a = r.length,
        c = !1;
    for (let p = 0; p < a; p++) {
        let d = r[p];
        !c && gt(d) && (c = !0, Av(e, n, p)), kg(zl(n, t), e, d.type)
    }
    Vv(n, e.data.length, a);
    for (let p = 0; p < a; p++) {
        let d = r[p];
        d.providersResolver && d.providersResolver(d)
    }
    let u = !1,
        l = !1,
        f = Md(e, t, a, null);
    a > 0 && (n.directiveToIndex = new Map);
    for (let p = 0; p < a; p++) {
        let d = r[p];
        if (n.mergedAttrs = Ys(n.mergedAttrs, d.hostAttrs), Pv(e, n, t, f, d), jv(f, d, o), s !== null && s.has(d)) {
            let [y, P] = s.get(d);
            n.directiveToIndex.set(d.type, [f, y + n.directiveStart, P + n.directiveStart])
        } else(i === null || !i.has(d)) && n.directiveToIndex.set(d.type, f);
        d.contentQueries !== null && (n.flags |= 4), (d.hostBindings !== null || d.hostAttrs !== null || d.hostVars !== 0) && (n.flags |= 64);
        let h = d.type.prototype;
        !u && (h.ngOnChanges || h.ngOnInit || h.ngDoCheck) && ((e.preOrderHooks ??= []).push(n.index), u = !0), !l && (h.ngOnChanges || h.ngDoCheck) && ((e.preOrderCheckHooks ??= []).push(n.index), l = !0), f++
    }
    kv(e, n, i)
}

function kv(e, t, n) {
    for (let r = t.directiveStart; r < t.directiveEnd; r++) {
        let o = e.data[r];
        if (n === null || !n.has(o)) Au(0, t, o, r), Au(1, t, o, r), ku(t, r, !1);
        else {
            let i = n.get(o);
            Ou(0, t, i, r), Ou(1, t, i, r), ku(t, r, !0)
        }
    }
}

function Au(e, t, n, r) {
    let o = e === 0 ? n.inputs : n.outputs;
    for (let i in o)
        if (o.hasOwnProperty(i)) {
            let s;
            e === 0 ? s = t.inputs ??= {} : s = t.outputs ??= {}, s[i] ??= [], s[i].push(r), Qd(t, i)
        }
}

function Ou(e, t, n, r) {
    let o = e === 0 ? n.inputs : n.outputs;
    for (let i in o)
        if (o.hasOwnProperty(i)) {
            let s = o[i],
                a;
            e === 0 ? a = t.hostDirectiveInputs ??= {} : a = t.hostDirectiveOutputs ??= {}, a[s] ??= [], a[s].push(r, i), Qd(t, s)
        }
}

function Qd(e, t) {
    t === "class" ? e.flags |= 8 : t === "style" && (e.flags |= 16)
}

function ku(e, t, n) {
    let {
        attrs: r,
        inputs: o,
        hostDirectiveInputs: i
    } = e;
    if (r === null || !n && o === null || n && i === null || oa(e)) {
        e.initialInputs ??= [], e.initialInputs.push(null);
        return
    }
    let s = null,
        a = 0;
    for (; a < r.length;) {
        let c = r[a];
        if (c === 0) {
            a += 4;
            continue
        } else if (c === 5) {
            a += 2;
            continue
        } else if (typeof c == "number") break;
        if (!n && o.hasOwnProperty(c)) {
            let u = o[c];
            for (let l of u)
                if (l === t) {
                    s ??= [], s.push(c, r[a + 1]);
                    break
                }
        } else if (n && i.hasOwnProperty(c)) {
            let u = i[c];
            for (let l = 0; l < u.length; l += 2)
                if (u[l] === t) {
                    s ??= [], s.push(u[l + 1], r[a + 1]);
                    break
                }
        }
        a += 2
    }
    e.initialInputs ??= [], e.initialInputs.push(s)
}

function Pv(e, t, n, r, o) {
    e.data[r] = o;
    let i = o.factory || (o.factory = Lt(o.type, !0)),
        s = new In(i, gt(o), Wd);
    e.blueprint[r] = s, n[r] = s, Fv(e, t, r, Md(e, n, o.hostVars, Io), o)
}

function Fv(e, t, n, r, o) {
    let i = o.hostBindings;
    if (i) {
        let s = e.hostBindingOpCodes;
        s === null && (s = e.hostBindingOpCodes = []);
        let a = ~t.index;
        Lv(s) != a && s.push(a), s.push(n, r, i)
    }
}

function Lv(e) {
    let t = e.length;
    for (; t > 0;) {
        let n = e[--t];
        if (typeof n == "number" && n < 0) return n
    }
    return 0
}

function jv(e, t, n) {
    if (n) {
        if (t.exportAs)
            for (let r = 0; r < t.exportAs.length; r++) n[t.exportAs[r]] = e;
        gt(t) && (n[""] = e)
    }
}

function Vv(e, t, n) {
    e.flags |= 1, e.directiveStart = t, e.directiveEnd = t + n, e.providerIndexes = t
}

function Yd(e, t, n, r, o, i, s, a) {
    let c = t.consts,
        u = Cn(c, s),
        l = qd(t, e, 2, r, u);
    return i && Zd(t, n, l, Cn(c, a), o), l.mergedAttrs = Ys(l.mergedAttrs, l.attrs), l.attrs !== null && Ru(l, l.attrs, !1), l.mergedAttrs !== null && Ru(l, l.mergedAttrs, !0), t.queries !== null && t.queries.elementStart(t, l), l
}

function Kd(e, t) {
    Vl(e, t), vl(t) && e.queries.elementEnd(t)
}
var oo = class extends To {
    ngModule;
    constructor(t) {
        super(), this.ngModule = t
    }
    resolveComponentFactory(t) {
        let n = Vt(t);
        return new Tn(n, this.ngModule)
    }
};

function Bv(e) {
    return Object.keys(e).map(t => {
        let [n, r, o] = e[t], i = {
            propName: n,
            templateName: t,
            isSignal: (r & So.SignalBased) !== 0
        };
        return o && (i.transform = o), i
    })
}

function $v(e) {
    return Object.keys(e).map(t => ({
        propName: e[t],
        templateName: t
    }))
}

function Hv(e, t, n) {
    let r = t instanceof fe ? t : t?.injector;
    return r && e.getStandaloneInjector !== null && (r = e.getStandaloneInjector(r) || r), r ? new ms(n, r) : n
}

function Uv(e) {
    let t = e.get($t, null);
    if (t === null) throw new v(407, !1);
    let n = e.get(Tv, null),
        r = e.get(bn, null);
    return {
        rendererFactory: t,
        sanitizer: n,
        changeDetectionScheduler: r
    }
}

function zv(e, t) {
    let n = (e.selectors[0][0] || "div").toLowerCase();
    return Cd(t, n, n === "svg" ? Xh : n === "math" ? eg : null)
}
var Tn = class extends Gd {
        componentDef;
        ngModule;
        selector;
        componentType;
        ngContentSelectors;
        isBoundToModule;
        cachedInputs = null;
        cachedOutputs = null;
        get inputs() {
            return this.cachedInputs ??= Bv(this.componentDef.inputs), this.cachedInputs
        }
        get outputs() {
            return this.cachedOutputs ??= $v(this.componentDef.outputs), this.cachedOutputs
        }
        constructor(t, n) {
            super(), this.componentDef = t, this.ngModule = n, this.componentType = t.type, this.selector = Cm(t.selectors), this.ngContentSelectors = t.ngContentSelectors ?? [], this.isBoundToModule = !!n
        }
        create(t, n, r, o) {
            V(22);
            let i = T(null);
            try {
                let s = this.componentDef,
                    a = r ? ["ng-version", "19.2.10"] : Im(this.componentDef.selectors[0]),
                    c = ia(0, null, null, 1, 0, null, null, null, null, [a], null),
                    u = Hv(s, o || this.ngModule, t),
                    l = Uv(u),
                    f = l.rendererFactory.createRenderer(null, s),
                    p = r ? xm(f, r, s.encapsulation, u) : zv(s, f),
                    d = sa(null, c, null, 512 | Sd(s), null, null, l, f, u, null, pd(p, u, !0));
                d[ke] = p, Zs(d);
                let h = null;
                try {
                    let y = Yd(ke, c, d, "#host", () => [this.componentDef], !0, 0);
                    p && (bd(f, p, y), kn(p, d)), ca(c, d, y), gd(c, y, d), Kd(c, y), n !== void 0 && qv(y, this.ngContentSelectors, n), h = Pe(y.index, d), d[K] = h[K], la(c, d, null)
                } catch (y) {
                    throw h !== null && us(h), us(d), y
                } finally {
                    V(23), Qs()
                }
                return new vs(this.componentType, d)
            } finally {
                T(i)
            }
        }
    },
    vs = class extends _v {
        _rootLView;
        instance;
        hostView;
        changeDetectorRef;
        componentType;
        location;
        previousInputValues = null;
        _tNode;
        constructor(t, n) {
            super(), this._rootLView = n, this._tNode = Us(n[M], ke), this.location = Wt(this._tNode, n), this.instance = Pe(this._tNode.index, n)[K], this.hostView = this.changeDetectorRef = new Mn(n, void 0, !1), this.componentType = t
        }
        setInput(t, n) {
            let r = this._tNode;
            if (this.previousInputValues ??= new Map, this.previousInputValues.has(t) && Object.is(this.previousInputValues.get(t), n)) return;
            let o = this._rootLView,
                i = ua(r, o[M], o, t, n);
            this.previousInputValues.set(t, n);
            let s = Pe(r.index, o);
            ga(s, 1)
        }
        get injector() {
            return new at(this._tNode, this._rootLView)
        }
        destroy() {
            this.hostView.destroy()
        }
        onDestroy(t) {
            this.hostView.onDestroy(t)
        }
    };

function qv(e, t, n) {
    let r = e.projection = [];
    for (let o = 0; o < t.length; o++) {
        let i = n[o];
        r.push(i != null && i.length ? Array.from(i) : null)
    }
}
var Zt = (() => {
    class e {
        static __NG_ELEMENT_ID__ = Gv
    }
    return e
})();

function Gv() {
    let e = $e();
    return Xd(e, B())
}
var Wv = Zt,
    Jd = class extends Wv {
        _lContainer;
        _hostTNode;
        _hostLView;
        constructor(t, n, r) {
            super(), this._lContainer = t, this._hostTNode = n, this._hostLView = r
        }
        get element() {
            return Wt(this._hostTNode, this._hostLView)
        }
        get injector() {
            return new at(this._hostTNode, this._hostLView)
        }
        get parentInjector() {
            let t = Ks(this._hostTNode, this._hostLView);
            if ($l(t)) {
                let n = Qr(t, this._hostLView),
                    r = Zr(t),
                    o = n[M].data[r + 8];
                return new at(o, n)
            } else return new at(null, this._hostLView)
        }
        clear() {
            for (; this.length > 0;) this.remove(this.length - 1)
        }
        get(t) {
            let n = Pu(this._lContainer);
            return n !== null && n[t] || null
        }
        get length() {
            return this._lContainer.length - J
        }
        createEmbeddedView(t, n, r) {
            let o, i;
            typeof r == "number" ? o = r : r != null && (o = r.index, i = r.injector);
            let s = ro(this._lContainer, t.ssrId),
                a = t.createEmbeddedViewImpl(n || {}, i, s);
            return this.insertImpl(a, o, to(this._hostTNode, s)), a
        }
        createComponent(t, n, r, o, i) {
            let s = t && !Qh(t),
                a;
            if (s) a = n;
            else {
                let h = n || {};
                a = h.index, r = h.injector, o = h.projectableNodes, i = h.environmentInjector || h.ngModuleRef
            }
            let c = s ? t : new Tn(Vt(t)),
                u = r || this.parentInjector;
            if (!i && c.ngModule == null) {
                let y = (s ? u : this.parentInjector).get(fe, null);
                y && (i = y)
            }
            let l = Vt(c.componentType ?? {}),
                f = ro(this._lContainer, l?.id ?? null),
                p = f?.firstChild ?? null,
                d = c.create(u, o, p, i);
            return this.insertImpl(d.hostView, a, to(this._hostTNode, f)), d
        }
        insert(t, n) {
            return this.insertImpl(t, n, !0)
        }
        insertImpl(t, n, r) {
            let o = t._lView;
            if (rg(o)) {
                let a = this.indexOf(t);
                if (a !== -1) this.detach(a);
                else {
                    let c = o[X],
                        u = new Jd(c, c[Ce], c[X]);
                    u.detach(u.indexOf(t))
                }
            }
            let i = this._adjustIndex(n),
                s = this._lContainer;
            return ma(s, o, i, r), t.attachToViewContainerRef(), cl(Hi(s), i, t), t
        }
        move(t, n) {
            return this.insert(t, n)
        }
        indexOf(t) {
            let n = Pu(this._lContainer);
            return n !== null ? n.indexOf(t) : -1
        }
        remove(t) {
            let n = this._adjustIndex(t, -1),
                r = Sn(this._lContainer, n);
            r && (Hr(Hi(this._lContainer), n), Mo(r[M], r))
        }
        detach(t) {
            let n = this._adjustIndex(t, -1),
                r = Sn(this._lContainer, n);
            return r && Hr(Hi(this._lContainer), n) != null ? new Mn(r) : null
        }
        _adjustIndex(t, n = 0) {
            return t ?? this.length + n
        }
    };

function Pu(e) {
    return e[Gr]
}

function Hi(e) {
    return e[Gr] || (e[Gr] = [])
}

function Xd(e, t) {
    let n, r = t[e.index];
    return je(r) ? n = r : (n = Ud(r, t, null, e), t[e.index] = n, aa(t, n)), Qv(n, t, e, r), new Jd(n, e, t)
}

function Zv(e, t) {
    let n = e[se],
        r = n.createComment(""),
        o = Ve(t, e),
        i = n.parentNode(o);
    return eo(n, i, r, n.nextSibling(o), !1), r
}
var Qv = Jv,
    Yv = () => !1;

function Kv(e, t, n) {
    return Yv(e, t, n)
}

function Jv(e, t, n, r) {
    if (e[lt]) return;
    let o;
    n.type & 8 ? o = Se(r) : o = Zv(t, n), e[lt] = o
}
var ys = class e {
        queryList;
        matches = null;
        constructor(t) {
            this.queryList = t
        }
        clone() {
            return new e(this.queryList)
        }
        setDirty() {
            this.queryList.setDirty()
        }
    },
    Ds = class e {
        queries;
        constructor(t = []) {
            this.queries = t
        }
        createEmbeddedView(t) {
            let n = t.queries;
            if (n !== null) {
                let r = t.contentQueries !== null ? t.contentQueries[0] : n.length,
                    o = [];
                for (let i = 0; i < r; i++) {
                    let s = n.getByIndex(i),
                        a = this.queries[s.indexInDeclarationView];
                    o.push(a.clone())
                }
                return new e(o)
            }
            return null
        }
        insertView(t) {
            this.dirtyQueriesWithMatches(t)
        }
        detachView(t) {
            this.dirtyQueriesWithMatches(t)
        }
        finishViewCreation(t) {
            this.dirtyQueriesWithMatches(t)
        }
        dirtyQueriesWithMatches(t) {
            for (let n = 0; n < this.queries.length; n++) ya(t, n).matches !== null && this.queries[n].setDirty()
        }
    },
    ws = class {
        flags;
        read;
        predicate;
        constructor(t, n, r = null) {
            this.flags = n, this.read = r, typeof t == "string" ? this.predicate = sy(t) : this.predicate = t
        }
    },
    Es = class e {
        queries;
        constructor(t = []) {
            this.queries = t
        }
        elementStart(t, n) {
            for (let r = 0; r < this.queries.length; r++) this.queries[r].elementStart(t, n)
        }
        elementEnd(t) {
            for (let n = 0; n < this.queries.length; n++) this.queries[n].elementEnd(t)
        }
        embeddedTView(t) {
            let n = null;
            for (let r = 0; r < this.length; r++) {
                let o = n !== null ? n.length : 0,
                    i = this.getByIndex(r).embeddedTView(t, o);
                i && (i.indexInDeclarationView = r, n !== null ? n.push(i) : n = [i])
            }
            return n !== null ? new e(n) : null
        }
        template(t, n) {
            for (let r = 0; r < this.queries.length; r++) this.queries[r].template(t, n)
        }
        getByIndex(t) {
            return this.queries[t]
        }
        get length() {
            return this.queries.length
        }
        track(t) {
            this.queries.push(t)
        }
    },
    Cs = class e {
        metadata;
        matches = null;
        indexInDeclarationView = -1;
        crossesNgTemplate = !1;
        _declarationNodeIndex;
        _appliesToNextNode = !0;
        constructor(t, n = -1) {
            this.metadata = t, this._declarationNodeIndex = n
        }
        elementStart(t, n) {
            this.isApplyingToNode(n) && this.matchTNode(t, n)
        }
        elementEnd(t) {
            this._declarationNodeIndex === t.index && (this._appliesToNextNode = !1)
        }
        template(t, n) {
            this.elementStart(t, n)
        }
        embeddedTView(t, n) {
            return this.isApplyingToNode(t) ? (this.crossesNgTemplate = !0, this.addMatch(-t.index, n), new e(this.metadata)) : null
        }
        isApplyingToNode(t) {
            if (this._appliesToNextNode && (this.metadata.flags & 1) !== 1) {
                let n = this._declarationNodeIndex,
                    r = t.parent;
                for (; r !== null && r.type & 8 && r.index !== n;) r = r.parent;
                return n === (r !== null ? r.index : -1)
            }
            return this._appliesToNextNode
        }
        matchTNode(t, n) {
            let r = this.metadata.predicate;
            if (Array.isArray(r))
                for (let o = 0; o < r.length; o++) {
                    let i = r[o];
                    this.matchTNodeWithReadOption(t, n, Xv(n, i)), this.matchTNodeWithReadOption(t, n, Fr(n, t, i, !1, !1))
                } else r === _n ? n.type & 4 && this.matchTNodeWithReadOption(t, n, -1) : this.matchTNodeWithReadOption(t, n, Fr(n, t, r, !1, !1))
        }
        matchTNodeWithReadOption(t, n, r) {
            if (r !== null) {
                let o = this.metadata.read;
                if (o !== null)
                    if (o === On || o === Zt || o === _n && n.type & 4) this.addMatch(n.index, -2);
                    else {
                        let i = Fr(n, t, o, !1, !1);
                        i !== null && this.addMatch(n.index, i)
                    }
                else this.addMatch(n.index, r)
            }
        }
        addMatch(t, n) {
            this.matches === null ? this.matches = [t, n] : this.matches.push(t, n)
        }
    };

function Xv(e, t) {
    let n = e.localNames;
    if (n !== null) {
        for (let r = 0; r < n.length; r += 2)
            if (n[r] === t) return n[r + 1]
    }
    return null
}

function ey(e, t) {
    return e.type & 11 ? Wt(e, t) : e.type & 4 ? va(e, t) : null
}

function ty(e, t, n, r) {
    return n === -1 ? ey(t, e) : n === -2 ? ny(e, t, r) : Yr(e, e[M], n, t)
}

function ny(e, t, n) {
    if (n === On) return Wt(t, e);
    if (n === _n) return va(t, e);
    if (n === Zt) return Xd(t, e)
}

function ef(e, t, n, r) {
    let o = t[Oe].queries[r];
    if (o.matches === null) {
        let i = e.data,
            s = n.matches,
            a = [];
        for (let c = 0; s !== null && c < s.length; c += 2) {
            let u = s[c];
            if (u < 0) a.push(null);
            else {
                let l = i[u];
                a.push(ty(t, l, s[c + 1], n.metadata.read))
            }
        }
        o.matches = a
    }
    return o.matches
}

function Is(e, t, n, r) {
    let o = e.queries.getByIndex(n),
        i = o.matches;
    if (i !== null) {
        let s = ef(e, t, o, n);
        for (let a = 0; a < i.length; a += 2) {
            let c = i[a];
            if (c > 0) r.push(s[a / 2]);
            else {
                let u = i[a + 1],
                    l = t[-c];
                for (let f = J; f < l.length; f++) {
                    let p = l[f];
                    p[ut] === p[X] && Is(p[M], p, u, r)
                }
                if (l[Bt] !== null) {
                    let f = l[Bt];
                    for (let p = 0; p < f.length; p++) {
                        let d = f[p];
                        Is(d[M], d, u, r)
                    }
                }
            }
        }
    }
    return r
}

function ry(e, t) {
    return e[Oe].queries[t].queryList
}

function oy(e, t, n) {
    let r = new cs((n & 4) === 4);
    return ig(e, t, r, r.destroy), (t[Oe] ??= new Ds).queries.push(new ys(r)) - 1
}

function iy(e, t, n) {
    let r = Be();
    return r.firstCreatePass && (ay(r, new ws(e, t, n), -1), (t & 2) === 2 && (r.staticViewQueries = !0)), oy(r, B(), t)
}

function sy(e) {
    return e.split(",").map(t => t.trim())
}

function ay(e, t, n) {
    e.queries === null && (e.queries = new Es), e.queries.track(new Cs(t, n))
}

function ya(e, t) {
    return e.queries.getByIndex(t)
}

function cy(e, t) {
    let n = e[M],
        r = ya(n, t);
    return r.crossesNgTemplate ? Is(n, e, t, []) : ef(n, e, r, t)
}
var Nn = class {},
    Da = class {};
var bs = class extends Nn {
        ngModuleType;
        _parent;
        _bootstrapComponents = [];
        _r3Injector;
        instance;
        destroyCbs = [];
        componentFactoryResolver = new oo(this);
        constructor(t, n, r, o = !0) {
            super(), this.ngModuleType = t, this._parent = n;
            let i = dl(t);
            this._bootstrapComponents = wd(i.bootstrap), this._r3Injector = Kl(t, n, [{
                provide: Nn,
                useValue: this
            }, {
                provide: To,
                useValue: this.componentFactoryResolver
            }, ...r], oe(t), new Set(["environment"])), o && this.resolveInjectorInitializers()
        }
        resolveInjectorInitializers() {
            this._r3Injector.resolveInjectorInitializers(), this.instance = this._r3Injector.get(this.ngModuleType)
        }
        get injector() {
            return this._r3Injector
        }
        destroy() {
            let t = this._r3Injector;
            !t.destroyed && t.destroy(), this.destroyCbs.forEach(n => n()), this.destroyCbs = null
        }
        onDestroy(t) {
            this.destroyCbs.push(t)
        }
    },
    Ss = class extends Da {
        moduleType;
        constructor(t) {
            super(), this.moduleType = t
        }
        create(t) {
            return new bs(this.moduleType, t, [])
        }
    };
var io = class extends Nn {
    injector;
    componentFactoryResolver = new oo(this);
    instance = null;
    constructor(t) {
        super();
        let n = new Dn([...t.providers, {
            provide: Nn,
            useValue: this
        }, {
            provide: To,
            useValue: this.componentFactoryResolver
        }], t.parent || Bs(), t.debugName, new Set(["environment"]));
        this.injector = n, t.runEnvironmentInitializers && n.resolveInjectorInitializers()
    }
    destroy() {
        this.injector.destroy()
    }
    onDestroy(t) {
        this.injector.onDestroy(t)
    }
};

function No(e, t, n = null) {
    return new io({
        providers: e,
        parent: t,
        debugName: n,
        runEnvironmentInitializers: !0
    }).injector
}
var uy = (() => {
    class e {
        _injector;
        cachedInjectors = new Map;
        constructor(n) {
            this._injector = n
        }
        getOrCreateStandaloneInjector(n) {
            if (!n.standalone) return null;
            if (!this.cachedInjectors.has(n)) {
                let r = fl(!1, n.type),
                    o = r.length > 0 ? No([r], this._injector, `Standalone[${n.type.name}]`) : null;
                this.cachedInjectors.set(n, o)
            }
            return this.cachedInjectors.get(n)
        }
        ngOnDestroy() {
            try {
                for (let n of this.cachedInjectors.values()) n !== null && n.destroy()
            } finally {
                this.cachedInjectors.clear()
            }
        }
        static \u0275prov = w({
            token: e,
            providedIn: "environment",
            factory: () => new e(_(fe))
        })
    }
    return e
})();

function xo(e) {
    return uo(() => {
        let t = tf(e),
            n = O(m({}, t), {
                decls: e.decls,
                vars: e.vars,
                template: e.template,
                consts: e.consts || null,
                ngContentSelectors: e.ngContentSelectors,
                onPush: e.changeDetection === id.OnPush,
                directiveDefs: null,
                pipeDefs: null,
                dependencies: t.standalone && e.dependencies || null,
                getStandaloneInjector: t.standalone ? o => o.get(uy).getOrCreateStandaloneInjector(n) : null,
                getExternalStyles: null,
                signals: e.signals ?? !1,
                data: e.data || {},
                encapsulation: e.encapsulation || Me.Emulated,
                styles: e.styles || ye,
                _: null,
                schemas: e.schemas || null,
                tView: null,
                id: ""
            });
        t.standalone && Co("NgStandalone"), nf(n);
        let r = e.dependencies;
        return n.directiveDefs = Fu(r, !1), n.pipeDefs = Fu(r, !0), n.id = hy(n), n
    })
}

function ly(e) {
    return Vt(e) || Fh(e)
}

function dy(e) {
    return e !== null
}

function Ro(e) {
    return uo(() => ({
        type: e.type,
        bootstrap: e.bootstrap || ye,
        declarations: e.declarations || ye,
        imports: e.imports || ye,
        exports: e.exports || ye,
        transitiveCompileScopes: null,
        schemas: e.schemas || null,
        id: e.id || null
    }))
}

function fy(e, t) {
    if (e == null) return jt;
    let n = {};
    for (let r in e)
        if (e.hasOwnProperty(r)) {
            let o = e[r],
                i, s, a, c;
            Array.isArray(o) ? (a = o[0], i = o[1], s = o[2] ?? i, c = o[3] || null) : (i = o, s = o, a = So.None, c = null), n[i] = [r, a, c], t[i] = s
        } return n
}

function py(e) {
    if (e == null) return jt;
    let t = {};
    for (let n in e) e.hasOwnProperty(n) && (t[e[n]] = n);
    return t
}

function wa(e) {
    return uo(() => {
        let t = tf(e);
        return nf(t), t
    })
}

function tf(e) {
    let t = {};
    return {
        type: e.type,
        providersResolver: null,
        factory: null,
        hostBindings: e.hostBindings || null,
        hostVars: e.hostVars || 0,
        hostAttrs: e.hostAttrs || null,
        contentQueries: e.contentQueries || null,
        declaredInputs: t,
        inputConfig: e.inputs || jt,
        exportAs: e.exportAs || null,
        standalone: e.standalone ?? !0,
        signals: e.signals === !0,
        selectors: e.selectors || ye,
        viewQuery: e.viewQuery || null,
        features: e.features || null,
        setInput: null,
        findHostDirectiveDefs: null,
        hostDirectives: null,
        inputs: fy(e.inputs, t),
        outputs: py(e.outputs),
        debugInfo: null
    }
}

function nf(e) {
    e.features?.forEach(t => t(e))
}

function Fu(e, t) {
    if (!e) return null;
    let n = t ? Lh : ly;
    return () => (typeof e == "function" ? e() : e).map(r => n(r)).filter(dy)
}

function hy(e) {
    let t = 0,
        n = typeof e.consts == "function" ? "" : e.consts,
        r = [e.selectors, e.ngContentSelectors, e.hostVars, e.hostAttrs, n, e.vars, e.decls, e.encapsulation, e.standalone, e.signals, e.exportAs, JSON.stringify(e.inputs), JSON.stringify(e.outputs), Object.getOwnPropertyNames(e.type.prototype), !!e.contentQueries, !!e.viewQuery];
    for (let i of r.join("|")) t = Math.imul(31, t) + i.charCodeAt(0) << 0;
    return t += 2147483648, "c" + t
}

function Ea(e, t, n) {
    let r = e[t];
    return Object.is(r, n) ? !1 : (e[t] = n, !0)
}

function gy(e, t, n, r, o, i, s, a, c) {
    let u = t.consts,
        l = qd(t, e, 4, s || null, a || null);
    Sl() && Zd(t, n, l, Cn(u, c), xd), l.mergedAttrs = Ys(l.mergedAttrs, l.attrs), Vl(t, l);
    let f = l.tView = ia(2, l, r, o, i, t.directiveRegistry, t.pipeRegistry, null, t.schemas, u, null);
    return t.queries !== null && (t.queries.template(t, l), f.queries = t.queries.embeddedTView(l)), l
}

function Lu(e, t, n, r, o, i, s, a, c, u) {
    let l = n + ke,
        f = t.firstCreatePass ? gy(l, t, e, r, o, i, s, a, c) : t.data[l];
    yo(f, !1);
    let p = my(t, e, f, n);
    Ll() && Od(t, e, p, f), kn(p, e);
    let d = Ud(p, e, p, f);
    return e[l] = d, aa(e, d), Kv(d, f, e), $s(f) && ca(t, e, f), c != null && Nd(e, f, u), f
}
var my = vy;

function vy(e, t, n, r) {
    return jl(!0), t[se].createComment("")
}
var rf = (() => {
    class e {
        log(n) {
            console.log(n)
        }
        warn(n) {
            console.warn(n)
        }
        static \u0275fac = function(r) {
            return new(r || e)
        };
        static \u0275prov = w({
            token: e,
            factory: e.\u0275fac,
            providedIn: "platform"
        })
    }
    return e
})();
var of = new D("");
var yy = (() => {
        class e {
            static \u0275prov = w({
                token: e,
                providedIn: "root",
                factory: () => new Ms
            })
        }
        return e
    })(),
    Ms = class {
        queuedEffectCount = 0;
        queues = new Map;
        schedule(t) {
            this.enqueue(t)
        }
        remove(t) {
            let n = t.zone,
                r = this.queues.get(n);
            r.has(t) && (r.delete(t), this.queuedEffectCount--)
        }
        enqueue(t) {
            let n = t.zone;
            this.queues.has(n) || this.queues.set(n, new Set);
            let r = this.queues.get(n);
            r.has(t) || (this.queuedEffectCount++, r.add(t))
        }
        flush() {
            for (; this.queuedEffectCount > 0;)
                for (let [t, n] of this.queues) t === null ? this.flushQueue(n) : t.run(() => this.flushQueue(n))
        }
        flushQueue(t) {
            for (let n of t) t.delete(n), this.queuedEffectCount--, n.run()
        }
    };

function Ao(e) {
    return !!e && typeof e.then == "function"
}

function Dy(e) {
    return !!e && typeof e.subscribe == "function"
}
var wy = new D("");
var sf = (() => {
        class e {
            resolve;
            reject;
            initialized = !1;
            done = !1;
            donePromise = new Promise((n, r) => {
                this.resolve = n, this.reject = r
            });
            appInits = g(wy, {
                optional: !0
            }) ?? [];
            injector = g(Ye);
            constructor() {}
            runInitializers() {
                if (this.initialized) return;
                let n = [];
                for (let o of this.appInits) {
                    let i = Ee(this.injector, o);
                    if (Ao(i)) n.push(i);
                    else if (Dy(i)) {
                        let s = new Promise((a, c) => {
                            i.subscribe({
                                complete: a,
                                error: c
                            })
                        });
                        n.push(s)
                    }
                }
                let r = () => {
                    this.done = !0, this.resolve()
                };
                Promise.all(n).then(() => {
                    r()
                }).catch(o => {
                    this.reject(o)
                }), n.length === 0 && r(), this.initialized = !0
            }
            static \u0275fac = function(r) {
                return new(r || e)
            };
            static \u0275prov = w({
                token: e,
                factory: e.\u0275fac,
                providedIn: "root"
            })
        }
        return e
    })(),
    Ca = new D("");

function Ey() {
    mi(() => {
        throw new v(600, !1)
    })
}

function Cy(e) {
    return e.isBoundToModule
}
var Iy = 10;
var pt = (() => {
    class e {
        _runningTick = !1;
        _destroyed = !1;
        _destroyListeners = [];
        _views = [];
        internalErrorHandler = g(Wg);
        afterRenderManager = g(sm);
        zonelessEnabled = g(Xs);
        rootEffectScheduler = g(yy);
        dirtyFlags = 0;
        tracingSnapshot = null;
        externalTestViews = new Set;
        afterTick = new q;
        get allViews() {
            return [...this.externalTestViews.keys(), ...this._views]
        }
        get destroyed() {
            return this._destroyed
        }
        componentTypes = [];
        components = [];
        isStable = g(Gt).hasPendingTasks.pipe(R(n => !n));
        constructor() {
            g(Eo, {
                optional: !0
            })
        }
        whenStable() {
            let n;
            return new Promise(r => {
                n = this.isStable.subscribe({
                    next: o => {
                        o && r()
                    }
                })
            }).finally(() => {
                n.unsubscribe()
            })
        }
        _injector = g(fe);
        _rendererFactory = null;
        get injector() {
            return this._injector
        }
        bootstrap(n, r) {
            return this.bootstrapImpl(n, r)
        }
        bootstrapImpl(n, r, o = Ye.NULL) {
            V(10);
            let i = n instanceof Gd;
            if (!this._injector.get(sf).done) {
                let d = "";
                throw new v(405, d)
            }
            let a;
            i ? a = n : a = this._injector.get(To).resolveComponentFactory(n), this.componentTypes.push(a.componentType);
            let c = Cy(a) ? void 0 : this._injector.get(Nn),
                u = r || a.selector,
                l = a.create(o, [], u, c),
                f = l.location.nativeElement,
                p = l.injector.get(of, null);
            return p?.registerApplication(f), l.onDestroy(() => {
                this.detachView(l.hostView), Lr(this.components, l), p?.unregisterApplication(f)
            }), this._loadComponent(l), V(11, l), l
        }
        tick() {
            this.zonelessEnabled || (this.dirtyFlags |= 1), this._tick()
        }
        _tick() {
            V(12), this.tracingSnapshot !== null ? this.tracingSnapshot.run(fd.CHANGE_DETECTION, this.tickImpl) : this.tickImpl()
        }
        tickImpl = () => {
            if (this._runningTick) throw new v(101, !1);
            let n = T(null);
            try {
                this._runningTick = !0, this.synchronize()
            } catch (r) {
                this.internalErrorHandler(r)
            } finally {
                this._runningTick = !1, this.tracingSnapshot?.dispose(), this.tracingSnapshot = null, T(n), this.afterTick.next(), V(13)
            }
        };
        synchronize() {
            this._rendererFactory === null && !this._injector.destroyed && (this._rendererFactory = this._injector.get($t, null, {
                optional: !0
            }));
            let n = 0;
            for (; this.dirtyFlags !== 0 && n++ < Iy;) V(14), this.synchronizeOnce(), V(15)
        }
        synchronizeOnce() {
            if (this.dirtyFlags & 16 && (this.dirtyFlags &= -17, this.rootEffectScheduler.flush()), this.dirtyFlags & 7) {
                let n = !!(this.dirtyFlags & 1);
                this.dirtyFlags &= -8, this.dirtyFlags |= 8;
                for (let {
                        _lView: r,
                        notifyErrorHandler: o
                    }
                    of this.allViews) by(r, o, n, this.zonelessEnabled);
                if (this.dirtyFlags &= -5, this.syncDirtyFlagsWithViews(), this.dirtyFlags & 23) return
            } else this._rendererFactory?.begin?.(), this._rendererFactory?.end?.();
            this.dirtyFlags & 8 && (this.dirtyFlags &= -9, this.afterRenderManager.execute()), this.syncDirtyFlagsWithViews()
        }
        syncDirtyFlagsWithViews() {
            if (this.allViews.some(({
                    _lView: n
                }) => mo(n))) {
                this.dirtyFlags |= 2;
                return
            } else this.dirtyFlags &= -8
        }
        attachView(n) {
            let r = n;
            this._views.push(r), r.attachToAppRef(this)
        }
        detachView(n) {
            let r = n;
            Lr(this._views, r), r.detachFromAppRef()
        }
        _loadComponent(n) {
            this.attachView(n.hostView), this.tick(), this.components.push(n), this._injector.get(Ca, []).forEach(o => o(n))
        }
        ngOnDestroy() {
            if (!this._destroyed) try {
                this._destroyListeners.forEach(n => n()), this._views.slice().forEach(n => n.destroy())
            } finally {
                this._destroyed = !0, this._views = [], this._destroyListeners = []
            }
        }
        onDestroy(n) {
            return this._destroyListeners.push(n), () => Lr(this._destroyListeners, n)
        }
        destroy() {
            if (this._destroyed) throw new v(406, !1);
            let n = this._injector;
            n.destroy && !n.destroyed && n.destroy()
        }
        get viewCount() {
            return this._views.length
        }
        static \u0275fac = function(r) {
            return new(r || e)
        };
        static \u0275prov = w({
            token: e,
            factory: e.\u0275fac,
            providedIn: "root"
        })
    }
    return e
})();

function Lr(e, t) {
    let n = e.indexOf(t);
    n > -1 && e.splice(n, 1)
}

function by(e, t, n, r) {
    if (!n && !mo(e)) return;
    Vd(e, t, n && !r ? 0 : 1)
}

function Ar(e, t) {
    return e << 17 | t << 2
}

function ht(e) {
    return e >> 17 & 32767
}

function Sy(e) {
    return (e & 2) == 2
}

function My(e, t) {
    return e & 131071 | t << 17
}

function _s(e) {
    return e | 2
}

function Ht(e) {
    return (e & 131068) >> 2
}

function Ui(e, t) {
    return e & -131069 | t << 2
}

function _y(e) {
    return (e & 1) === 1
}

function Ts(e) {
    return e | 1
}

function Ty(e, t, n, r, o, i) {
    let s = i ? t.classBindings : t.styleBindings,
        a = ht(s),
        c = Ht(s);
    e[r] = n;
    let u = !1,
        l;
    if (Array.isArray(n)) {
        let f = n;
        l = f[1], (l === null || Rn(f, l) > 0) && (u = !0)
    } else l = n;
    if (o)
        if (c !== 0) {
            let p = ht(e[a + 1]);
            e[r + 1] = Ar(p, a), p !== 0 && (e[p + 1] = Ui(e[p + 1], r)), e[a + 1] = My(e[a + 1], r)
        } else e[r + 1] = Ar(a, 0), a !== 0 && (e[a + 1] = Ui(e[a + 1], r)), a = r;
    else e[r + 1] = Ar(c, 0), a === 0 ? a = r : e[c + 1] = Ui(e[c + 1], r), c = r;
    u && (e[r + 1] = _s(e[r + 1])), ju(e, l, r, !0), ju(e, l, r, !1), Ny(t, l, e, r, i), s = Ar(a, c), i ? t.classBindings = s : t.styleBindings = s
}

function Ny(e, t, n, r, o) {
    let i = o ? e.residualClasses : e.residualStyles;
    i != null && typeof t == "string" && Rn(i, t) >= 0 && (n[r + 1] = Ts(n[r + 1]))
}

function ju(e, t, n, r) {
    let o = e[n + 1],
        i = t === null,
        s = r ? ht(o) : Ht(o),
        a = !1;
    for (; s !== 0 && (a === !1 || i);) {
        let c = e[s],
            u = e[s + 1];
        xy(c, t) && (a = !0, e[s + 1] = r ? Ts(u) : _s(u)), s = r ? ht(u) : Ht(u)
    }
    a && (e[n + 1] = r ? _s(o) : Ts(o))
}

function xy(e, t) {
    return e === null || t == null || (Array.isArray(e) ? e[1] : e) === t ? !0 : Array.isArray(e) && typeof t == "string" ? Rn(e, t) >= 0 : !1
}

function Ia(e, t, n) {
    let r = B(),
        o = Nl();
    if (Ea(r, o, t)) {
        let i = Be(),
            s = Eg();
        km(i, s, r, e, t, r[se], n, !1)
    }
    return Ia
}

function Vu(e, t, n, r, o) {
    ua(t, e, n, o ? "class" : "style", r)
}

function Fn(e, t, n) {
    return af(e, t, n, !1), Fn
}

function ba(e, t) {
    return af(e, t, null, !0), ba
}

function af(e, t, n, r) {
    let o = B(),
        i = Be(),
        s = gg(2);
    if (i.firstUpdatePass && Ay(i, e, s, r), t !== Io && Ea(o, s, t)) {
        let a = i.data[qt()];
        Ly(i, a, o, o[se], e, o[s + 1] = jy(t, n), r, s)
    }
}

function Ry(e, t) {
    return t >= e.expandoStartIndex
}

function Ay(e, t, n, r) {
    let o = e.data;
    if (o[n + 1] === null) {
        let i = o[qt()],
            s = Ry(e, n);
        Vy(i, r) && t === null && !s && (t = !1), t = Oy(o, i, t, r), Ty(o, i, t, n, s, r)
    }
}

function Oy(e, t, n, r) {
    let o = Dg(e),
        i = r ? t.residualClasses : t.residualStyles;
    if (o === null)(r ? t.classBindings : t.styleBindings) === 0 && (n = zi(null, e, t, n, r), n = xn(n, t.attrs, r), i = null);
    else {
        let s = t.directiveStylingLast;
        if (s === -1 || e[s] !== o)
            if (n = zi(o, e, t, n, r), i === null) {
                let c = ky(e, t, r);
                c !== void 0 && Array.isArray(c) && (c = zi(null, e, t, c[1], r), c = xn(c, t.attrs, r), Py(e, t, r, c))
            } else i = Fy(e, t, r)
    }
    return i !== void 0 && (r ? t.residualClasses = i : t.residualStyles = i), n
}

function ky(e, t, n) {
    let r = n ? t.classBindings : t.styleBindings;
    if (Ht(r) !== 0) return e[ht(r)]
}

function Py(e, t, n, r) {
    let o = n ? t.classBindings : t.styleBindings;
    e[ht(o)] = r
}

function Fy(e, t, n) {
    let r, o = t.directiveEnd;
    for (let i = 1 + t.directiveStylingLast; i < o; i++) {
        let s = e[i].hostAttrs;
        r = xn(r, s, n)
    }
    return xn(r, t.attrs, n)
}

function zi(e, t, n, r, o) {
    let i = null,
        s = n.directiveEnd,
        a = n.directiveStylingLast;
    for (a === -1 ? a = n.directiveStart : a++; a < s && (i = t[a], r = xn(r, i.hostAttrs, o), i !== e);) a++;
    return e !== null && (n.directiveStylingLast = a), r
}

function xn(e, t, n) {
    let r = n ? 1 : 2,
        o = -1;
    if (t !== null)
        for (let i = 0; i < t.length; i++) {
            let s = t[i];
            typeof s == "number" ? o = s : o === r && (Array.isArray(e) || (e = e === void 0 ? [] : ["", e]), kh(e, s, n ? !0 : t[++i]))
        }
    return e === void 0 ? null : e
}

function Ly(e, t, n, r, o, i, s, a) {
    if (!(t.type & 3)) return;
    let c = e.data,
        u = c[a + 1],
        l = _y(u) ? Bu(c, t, n, o, Ht(u), s) : void 0;
    if (!so(l)) {
        so(i) || Sy(u) && (i = Bu(c, null, n, o, a, s));
        let f = tg(qt(), n);
        rv(r, s, f, o, i)
    }
}

function Bu(e, t, n, r, o, i) {
    let s = t === null,
        a;
    for (; o > 0;) {
        let c = e[o],
            u = Array.isArray(c),
            l = u ? c[1] : c,
            f = l === null,
            p = n[o + 1];
        p === Io && (p = f ? ye : void 0);
        let d = f ? ki(p, r) : l === r ? p : void 0;
        if (u && !so(d) && (d = ki(c, r)), so(d) && (a = d, s)) return a;
        let h = e[o + 1];
        o = s ? ht(h) : Ht(h)
    }
    if (t !== null) {
        let c = i ? t.residualClasses : t.residualStyles;
        c != null && (a = ki(c, r))
    }
    return a
}

function so(e) {
    return e !== void 0
}

function jy(e, t) {
    return e == null || e === "" || (typeof t == "string" ? e = e + t : typeof e == "object" && (e = oe(md(e)))), e
}

function Vy(e, t) {
    return (e.flags & (t ? 8 : 16)) !== 0
}
var Ns = class {
    destroy(t) {}
    updateValue(t, n) {}
    swap(t, n) {
        let r = Math.min(t, n),
            o = Math.max(t, n),
            i = this.detach(o);
        if (o - r > 1) {
            let s = this.detach(r);
            this.attach(r, i), this.attach(o, s)
        } else this.attach(r, i)
    }
    move(t, n) {
        this.attach(n, this.detach(t))
    }
};

function qi(e, t, n, r, o) {
    return e === n && Object.is(t, r) ? 1 : Object.is(o(e, t), o(n, r)) ? -1 : 0
}

function By(e, t, n) {
    let r, o, i = 0,
        s = e.length - 1,
        a = void 0;
    if (Array.isArray(t)) {
        let c = t.length - 1;
        for (; i <= s && i <= c;) {
            let u = e.at(i),
                l = t[i],
                f = qi(i, u, i, l, n);
            if (f !== 0) {
                f < 0 && e.updateValue(i, l), i++;
                continue
            }
            let p = e.at(s),
                d = t[c],
                h = qi(s, p, c, d, n);
            if (h !== 0) {
                h < 0 && e.updateValue(s, d), s--, c--;
                continue
            }
            let y = n(i, u),
                P = n(s, p),
                j = n(i, l);
            if (Object.is(j, P)) {
                let qe = n(c, d);
                Object.is(qe, y) ? (e.swap(i, s), e.updateValue(s, d), c--, s--) : e.move(s, i), e.updateValue(i, l), i++;
                continue
            }
            if (r ??= new ao, o ??= Hu(e, i, s, n), xs(e, r, i, j)) e.updateValue(i, l), i++, s++;
            else if (o.has(j)) r.set(y, e.detach(i)), s--;
            else {
                let qe = e.create(i, t[i]);
                e.attach(i, qe), i++, s++
            }
        }
        for (; i <= c;) $u(e, r, n, i, t[i]), i++
    } else if (t != null) {
        let c = t[Symbol.iterator](),
            u = c.next();
        for (; !u.done && i <= s;) {
            let l = e.at(i),
                f = u.value,
                p = qi(i, l, i, f, n);
            if (p !== 0) p < 0 && e.updateValue(i, f), i++, u = c.next();
            else {
                r ??= new ao, o ??= Hu(e, i, s, n);
                let d = n(i, f);
                if (xs(e, r, i, d)) e.updateValue(i, f), i++, s++, u = c.next();
                else if (!o.has(d)) e.attach(i, e.create(i, f)), i++, s++, u = c.next();
                else {
                    let h = n(i, l);
                    r.set(h, e.detach(i)), s--
                }
            }
        }
        for (; !u.done;) $u(e, r, n, e.length, u.value), u = c.next()
    }
    for (; i <= s;) e.destroy(e.detach(s--));
    r?.forEach(c => {
        e.destroy(c)
    })
}

function xs(e, t, n, r) {
    return t !== void 0 && t.has(r) ? (e.attach(n, t.get(r)), t.delete(r), !0) : !1
}

function $u(e, t, n, r, o) {
    if (xs(e, t, r, n(r, o))) e.updateValue(r, o);
    else {
        let i = e.create(r, o);
        e.attach(r, i)
    }
}

function Hu(e, t, n, r) {
    let o = new Set;
    for (let i = t; i <= n; i++) o.add(r(i, e.at(i)));
    return o
}
var ao = class {
    kvMap = new Map;
    _vMap = void 0;
    has(t) {
        return this.kvMap.has(t)
    }
    delete(t) {
        if (!this.has(t)) return !1;
        let n = this.kvMap.get(t);
        return this._vMap !== void 0 && this._vMap.has(n) ? (this.kvMap.set(t, this._vMap.get(n)), this._vMap.delete(n)) : this.kvMap.delete(t), !0
    }
    get(t) {
        return this.kvMap.get(t)
    }
    set(t, n) {
        if (this.kvMap.has(t)) {
            let r = this.kvMap.get(t);
            this._vMap === void 0 && (this._vMap = new Map);
            let o = this._vMap;
            for (; o.has(r);) r = o.get(r);
            o.set(r, n)
        } else this.kvMap.set(t, n)
    }
    forEach(t) {
        for (let [n, r] of this.kvMap)
            if (t(r, n), this._vMap !== void 0) {
                let o = this._vMap;
                for (; o.has(r);) r = o.get(r), t(r, n)
            }
    }
};
var Rs = class {
    lContainer;
    $implicit;
    $index;
    constructor(t, n, r) {
        this.lContainer = t, this.$implicit = n, this.$index = r
    }
    get $count() {
        return this.lContainer.length - J
    }
};
var As = class {
    hasEmptyBlock;
    trackByFn;
    liveCollection;
    constructor(t, n, r) {
        this.hasEmptyBlock = t, this.trackByFn = n, this.liveCollection = r
    }
};

function cf(e, t, n, r, o, i, s, a, c, u, l, f, p) {
    Co("NgControlFlow");
    let d = B(),
        h = Be(),
        y = c !== void 0,
        P = B(),
        j = a ? s.bind(P[we][K]) : s,
        qe = new As(y, j);
    P[ke + e] = qe, Lu(d, h, e + 1, t, n, r, o, Cn(h.consts, i)), y && Lu(d, h, e + 2, c, u, l, f, Cn(h.consts, p))
}
var Os = class extends Ns {
    lContainer;
    hostLView;
    templateTNode;
    operationsCounter = void 0;
    needsIndexUpdate = !1;
    constructor(t, n, r) {
        super(), this.lContainer = t, this.hostLView = n, this.templateTNode = r
    }
    get length() {
        return this.lContainer.length - J
    }
    at(t) {
        return this.getLView(t)[K].$implicit
    }
    attach(t, n) {
        let r = n[wn];
        this.needsIndexUpdate ||= t !== this.length, ma(this.lContainer, n, t, to(this.templateTNode, r))
    }
    detach(t) {
        return this.needsIndexUpdate ||= t !== this.length - 1, $y(this.lContainer, t)
    }
    create(t, n) {
        let r = ro(this.lContainer, this.templateTNode.tView.ssrId),
            o = da(this.hostLView, this.templateTNode, new Rs(this.lContainer, n, t), {
                dehydratedView: r
            });
        return this.operationsCounter?.recordCreate(), o
    }
    destroy(t) {
        Mo(t[M], t), this.operationsCounter?.recordDestroy()
    }
    updateValue(t, n) {
        this.getLView(t)[K].$implicit = n
    }
    reset() {
        this.needsIndexUpdate = !1, this.operationsCounter?.reset()
    }
    updateIndexes() {
        if (this.needsIndexUpdate)
            for (let t = 0; t < this.length; t++) this.getLView(t)[K].$index = t
    }
    getLView(t) {
        return Hy(this.lContainer, t)
    }
};

function uf(e) {
    let t = T(null),
        n = qt();
    try {
        let r = B(),
            o = r[M],
            i = r[n],
            s = n + 1,
            a = Uu(r, s);
        if (i.liveCollection === void 0) {
            let u = zu(o, s);
            i.liveCollection = new Os(a, r, u)
        } else i.liveCollection.reset();
        let c = i.liveCollection;
        if (By(c, e, i.trackByFn), c.updateIndexes(), i.hasEmptyBlock) {
            let u = Nl(),
                l = c.length === 0;
            if (Ea(r, u, l)) {
                let f = n + 2,
                    p = Uu(r, f);
                if (l) {
                    let d = zu(o, f),
                        h = ro(p, d.tView.ssrId),
                        y = da(r, d, void 0, {
                            dehydratedView: h
                        });
                    ma(p, y, 0, to(d, h))
                } else yv(p, 0)
            }
        }
    } finally {
        T(t)
    }
}

function Uu(e, t) {
    return e[t]
}

function $y(e, t) {
    return Sn(e, t)
}

function Hy(e, t) {
    return vv(e, t)
}

function zu(e, t) {
    return Us(e, t)
}

function Ln(e, t, n, r) {
    let o = B(),
        i = Be(),
        s = ke + e,
        a = o[se],
        c = i.firstCreatePass ? Yd(s, i, o, t, xd, Sl(), n, r) : i.data[s],
        u = Uy(i, o, c, a, t, e);
    o[s] = u;
    let l = $s(c);
    return yo(c, !0), bd(a, u, c), !Rd(c) && Ll() && Od(i, o, u, c), (sg() === 0 || l) && kn(u, o), ag(), l && (ca(i, o, c), gd(i, c, o)), r !== null && Nd(o, c), Ln
}

function jn() {
    let e = $e();
    _l() ? pg() : (e = e.parent, yo(e, !1));
    let t = e;
    lg(t) && dg(), cg();
    let n = Be();
    return n.firstCreatePass && Kd(n, t), t.classesWithoutHost != null && Sg(t) && Vu(n, t, B(), t.classesWithoutHost, !0), t.stylesWithoutHost != null && Mg(t) && Vu(n, t, B(), t.stylesWithoutHost, !1), jn
}

function Vn(e, t, n, r) {
    return Ln(e, t, n, r), jn(), Vn
}
var Uy = (e, t, n, r, o, i) => (jl(!0), Cd(r, o, Cg()));
var co = "en-US";
var zy = co;

function qy(e) {
    typeof e == "string" && (zy = e.toLowerCase().replace(/_/g, "-"))
}

function qu(e, t, n) {
    return function r(o) {
        if (o === Function) return n;
        let i = Ut(e) ? Pe(e.index, t) : t;
        ga(i, 5);
        let s = t[K],
            a = Gu(t, s, n, o),
            c = r.__ngNextListenerFn__;
        for (; c;) a = Gu(t, s, c, o) && a, c = c.__ngNextListenerFn__;
        return a
    }
}

function Gu(e, t, n, r) {
    let o = T(null);
    try {
        return V(6, t, n), n(r) !== !1
    } catch (i) {
        return Gy(e, i), !1
    } finally {
        V(7, t, n), T(o)
    }
}

function Gy(e, t) {
    let n = e[ct],
        r = n ? n.get(Fe, null) : null;
    r && r.handleError(t)
}

function Wu(e, t, n, r, o, i) {
    let s = t[n],
        a = t[M],
        u = a.data[n].outputs[r],
        l = s[u],
        f = a.firstCreatePass ? Gs(a) : null,
        p = qs(t),
        d = l.subscribe(i),
        h = p.length;
    p.push(i, d), f && f.push(o, e.index, h, -(h + 1))
}
var Wy = new Map;

function Sa(e, t, n, r) {
    let o = B(),
        i = Be(),
        s = $e();
    return Qy(i, o, o[se], s, e, t, r), Sa
}

function Zy(e, t, n, r) {
    let o = e.cleanup;
    if (o != null)
        for (let i = 0; i < o.length - 1; i += 2) {
            let s = o[i];
            if (s === n && o[i + 1] === r) {
                let a = t[zr],
                    c = o[i + 2];
                return a.length > c ? a[c] : null
            }
            typeof s == "string" && (i += 2)
        }
    return null
}

function Qy(e, t, n, r, o, i, s) {
    let a = $s(r),
        u = e.firstCreatePass ? Gs(e) : null,
        l = qs(t),
        f = !0;
    if (r.type & 3 || s) {
        let p = Ve(r, t),
            d = s ? s(p) : p,
            h = l.length,
            y = s ? j => s(Se(j[r.index])) : r.index,
            P = null;
        if (!s && a && (P = Zy(e, t, o, r.index)), P !== null) {
            let j = P.__ngLastListenerFn__ || P;
            j.__ngNextListenerFn__ = i, P.__ngLastListenerFn__ = i, f = !1
        } else {
            i = qu(r, t, i);
            let j = t[ct].get(wo);
            Wy.get(j)?.(d, o, i);
            let wt = n.listen(d, o, i);
            l.push(i, wt), u && u.push(o, y, h, h + 1)
        }
    } else i = qu(r, t, i);
    if (f) {
        let p = r.outputs?.[o],
            d = r.hostDirectiveOutputs?.[o];
        if (d && d.length)
            for (let h = 0; h < d.length; h += 2) {
                let y = d[h],
                    P = d[h + 1];
                Wu(r, t, y, P, o, i)
            }
        if (p && p.length)
            for (let h of p) Wu(r, t, h, o, o, i)
    }
}

function lf(e, t, n) {
    iy(e, t, n)
}

function df(e) {
    let t = B(),
        n = Be(),
        r = xl();
    Ws(r + 1);
    let o = ya(n, r);
    if (e.dirty && ng(t) === ((o.metadata.flags & 2) === 2)) {
        if (o.matches === null) e.reset([]);
        else {
            let i = cy(t, r);
            e.reset(i, Yg), e.notifyOnChanges()
        }
        return !0
    }
    return !1
}

function ff() {
    return ry(B(), xl())
}
var ks = class {
        ngModuleFactory;
        componentFactories;
        constructor(t, n) {
            this.ngModuleFactory = t, this.componentFactories = n
        }
    },
    pf = (() => {
        class e {
            compileModuleSync(n) {
                return new Ss(n)
            }
            compileModuleAsync(n) {
                return Promise.resolve(this.compileModuleSync(n))
            }
            compileModuleAndAllComponentsSync(n) {
                let r = this.compileModuleSync(n),
                    o = dl(n),
                    i = wd(o.declarations).reduce((s, a) => {
                        let c = Vt(a);
                        return c && s.push(new Tn(c)), s
                    }, []);
                return new ks(r, i)
            }
            compileModuleAndAllComponentsAsync(n) {
                return Promise.resolve(this.compileModuleAndAllComponentsSync(n))
            }
            clearCache() {}
            clearCacheFor(n) {}
            getModuleId(n) {}
            static \u0275fac = function(r) {
                return new(r || e)
            };
            static \u0275prov = w({
                token: e,
                factory: e.\u0275fac,
                providedIn: "root"
            })
        }
        return e
    })();
var Yy = (() => {
        class e {
            zone = g(W);
            changeDetectionScheduler = g(bn);
            applicationRef = g(pt);
            _onMicrotaskEmptySubscription;
            initialize() {
                this._onMicrotaskEmptySubscription || (this._onMicrotaskEmptySubscription = this.zone.onMicrotaskEmpty.subscribe({
                    next: () => {
                        this.changeDetectionScheduler.runningTick || this.zone.run(() => {
                            this.applicationRef.tick()
                        })
                    }
                }))
            }
            ngOnDestroy() {
                this._onMicrotaskEmptySubscription?.unsubscribe()
            }
            static \u0275fac = function(r) {
                return new(r || e)
            };
            static \u0275prov = w({
                token: e,
                factory: e.\u0275fac,
                providedIn: "root"
            })
        }
        return e
    })(),
    Ky = new D("", {
        factory: () => !1
    });

function hf({
    ngZoneFactory: e,
    ignoreChangesOutsideZone: t,
    scheduleInRootZone: n
}) {
    return e ??= () => new W(O(m({}, mf()), {
        scheduleInRootZone: n
    })), [{
        provide: W,
        useFactory: e
    }, {
        provide: yn,
        multi: !0,
        useFactory: () => {
            let r = g(Yy, {
                optional: !0
            });
            return () => r.initialize()
        }
    }, {
        provide: yn,
        multi: !0,
        useFactory: () => {
            let r = g(Jy);
            return () => {
                r.initialize()
            }
        }
    }, t === !0 ? {
        provide: Xl,
        useValue: !0
    } : [], {
        provide: ed,
        useValue: n ?? Jl
    }]
}

function gf(e) {
    let t = e?.ignoreChangesOutsideZone,
        n = e?.scheduleInRootZone,
        r = hf({
            ngZoneFactory: () => {
                let o = mf(e);
                return o.scheduleInRootZone = n, o.shouldCoalesceEventChangeDetection && Co("NgZone_CoalesceEvent"), new W(o)
            },
            ignoreChangesOutsideZone: t,
            scheduleInRootZone: n
        });
    return js([{
        provide: Ky,
        useValue: !0
    }, {
        provide: Xs,
        useValue: !1
    }, r])
}

function mf(e) {
    return {
        enableLongStackTrace: !1,
        shouldCoalesceEventChangeDetection: e?.eventCoalescing ?? !1,
        shouldCoalesceRunChangeDetection: e?.runCoalescing ?? !1
    }
}
var Jy = (() => {
    class e {
        subscription = new $;
        initialized = !1;
        zone = g(W);
        pendingTasks = g(Gt);
        initialize() {
            if (this.initialized) return;
            this.initialized = !0;
            let n = null;
            !this.zone.isStable && !this.zone.hasPendingMacrotasks && !this.zone.hasPendingMicrotasks && (n = this.pendingTasks.add()), this.zone.runOutsideAngular(() => {
                this.subscription.add(this.zone.onStable.subscribe(() => {
                    W.assertNotInAngularZone(), queueMicrotask(() => {
                        n !== null && !this.zone.hasPendingMacrotasks && !this.zone.hasPendingMicrotasks && (this.pendingTasks.remove(n), n = null)
                    })
                }))
            }), this.subscription.add(this.zone.onUnstable.subscribe(() => {
                W.assertInAngularZone(), n ??= this.pendingTasks.add()
            }))
        }
        ngOnDestroy() {
            this.subscription.unsubscribe()
        }
        static \u0275fac = function(r) {
            return new(r || e)
        };
        static \u0275prov = w({
            token: e,
            factory: e.\u0275fac,
            providedIn: "root"
        })
    }
    return e
})();
var Xy = (() => {
    class e {
        appRef = g(pt);
        taskService = g(Gt);
        ngZone = g(W);
        zonelessEnabled = g(Xs);
        tracing = g(Eo, {
            optional: !0
        });
        disableScheduling = g(Xl, {
            optional: !0
        }) ?? !1;
        zoneIsDefined = typeof Zone < "u" && !!Zone.root.run;
        schedulerTickApplyArgs = [{
            data: {
                __scheduler_tick__: !0
            }
        }];
        subscriptions = new $;
        angularZoneId = this.zoneIsDefined ? this.ngZone._inner?.get(Jr) : null;
        scheduleInRootZone = !this.zonelessEnabled && this.zoneIsDefined && (g(ed, {
            optional: !0
        }) ?? !1);
        cancelScheduledCallback = null;
        useMicrotaskScheduler = !1;
        runningTick = !1;
        pendingRenderTaskId = null;
        constructor() {
            this.subscriptions.add(this.appRef.afterTick.subscribe(() => {
                this.runningTick || this.cleanup()
            })), this.subscriptions.add(this.ngZone.onUnstable.subscribe(() => {
                this.runningTick || this.cleanup()
            })), this.disableScheduling ||= !this.zonelessEnabled && (this.ngZone instanceof as || !this.zoneIsDefined)
        }
        notify(n) {
            if (!this.zonelessEnabled && n === 5) return;
            let r = !1;
            switch (n) {
                case 0: {
                    this.appRef.dirtyFlags |= 2;
                    break
                }
                case 3:
                case 2:
                case 4:
                case 5:
                case 1: {
                    this.appRef.dirtyFlags |= 4;
                    break
                }
                case 6: {
                    this.appRef.dirtyFlags |= 2, r = !0;
                    break
                }
                case 12: {
                    this.appRef.dirtyFlags |= 16, r = !0;
                    break
                }
                case 13: {
                    this.appRef.dirtyFlags |= 2, r = !0;
                    break
                }
                case 11: {
                    r = !0;
                    break
                }
                case 9:
                case 8:
                case 7:
                case 10:
                default:
                    this.appRef.dirtyFlags |= 8
            }
            if (this.appRef.tracingSnapshot = this.tracing?.snapshot(this.appRef.tracingSnapshot) ?? null, !this.shouldScheduleTick(r)) return;
            let o = this.useMicrotaskScheduler ? Cu : td;
            this.pendingRenderTaskId = this.taskService.add(), this.scheduleInRootZone ? this.cancelScheduledCallback = Zone.root.run(() => o(() => this.tick())) : this.cancelScheduledCallback = this.ngZone.runOutsideAngular(() => o(() => this.tick()))
        }
        shouldScheduleTick(n) {
            return !(this.disableScheduling && !n || this.appRef.destroyed || this.pendingRenderTaskId !== null || this.runningTick || this.appRef._runningTick || !this.zonelessEnabled && this.zoneIsDefined && Zone.current.get(Jr + this.angularZoneId))
        }
        tick() {
            if (this.runningTick || this.appRef.destroyed) return;
            if (this.appRef.dirtyFlags === 0) {
                this.cleanup();
                return
            }!this.zonelessEnabled && this.appRef.dirtyFlags & 7 && (this.appRef.dirtyFlags |= 1);
            let n = this.taskService.add();
            try {
                this.ngZone.run(() => {
                    this.runningTick = !0, this.appRef._tick()
                }, void 0, this.schedulerTickApplyArgs)
            } catch (r) {
                throw this.taskService.remove(n), r
            } finally {
                this.cleanup()
            }
            this.useMicrotaskScheduler = !0, Cu(() => {
                this.useMicrotaskScheduler = !1, this.taskService.remove(n)
            })
        }
        ngOnDestroy() {
            this.subscriptions.unsubscribe(), this.cleanup()
        }
        cleanup() {
            if (this.runningTick = !1, this.cancelScheduledCallback?.(), this.cancelScheduledCallback = null, this.pendingRenderTaskId !== null) {
                let n = this.pendingRenderTaskId;
                this.pendingRenderTaskId = null, this.taskService.remove(n)
            }
        }
        static \u0275fac = function(r) {
            return new(r || e)
        };
        static \u0275prov = w({
            token: e,
            factory: e.\u0275fac,
            providedIn: "root"
        })
    }
    return e
})();

function eD() {
    return typeof $localize < "u" && $localize.locale || co
}
var vf = new D("", {
    providedIn: "root",
    factory: () => g(vf, b.Optional | b.SkipSelf) || eD()
});
var Ps = new D(""),
    tD = new D("");

function hn(e) {
    return !e.moduleRef
}

function nD(e) {
    let t = hn(e) ? e.r3Injector : e.moduleRef.injector,
        n = t.get(W);
    return n.run(() => {
        hn(e) ? e.r3Injector.resolveInjectorInitializers() : e.moduleRef.resolveInjectorInitializers();
        let r = t.get(Fe, null),
            o;
        if (n.runOutsideAngular(() => {
                o = n.onError.subscribe({
                    next: i => {
                        r.handleError(i)
                    }
                })
            }), hn(e)) {
            let i = () => t.destroy(),
                s = e.platformInjector.get(Ps);
            s.add(i), t.onDestroy(() => {
                o.unsubscribe(), s.delete(i)
            })
        } else {
            let i = () => e.moduleRef.destroy(),
                s = e.platformInjector.get(Ps);
            s.add(i), e.moduleRef.onDestroy(() => {
                Lr(e.allPlatformModules, e.moduleRef), o.unsubscribe(), s.delete(i)
            })
        }
        return oD(r, n, () => {
            let i = t.get(sf);
            return i.runInitializers(), i.donePromise.then(() => {
                let s = t.get(vf, co);
                if (qy(s || co), !t.get(tD, !0)) return hn(e) ? t.get(pt) : (e.allPlatformModules.push(e.moduleRef), e.moduleRef);
                if (hn(e)) {
                    let c = t.get(pt);
                    return e.rootComponent !== void 0 && c.bootstrap(e.rootComponent), c
                } else return rD(e.moduleRef, e.allPlatformModules), e.moduleRef
            })
        })
    })
}

function rD(e, t) {
    let n = e.injector.get(pt);
    if (e._bootstrapComponents.length > 0) e._bootstrapComponents.forEach(r => n.bootstrap(r));
    else if (e.instance.ngDoBootstrap) e.instance.ngDoBootstrap(n);
    else throw new v(-403, !1);
    t.push(e)
}

function oD(e, t, n) {
    try {
        let r = n();
        return Ao(r) ? r.catch(o => {
            throw t.runOutsideAngular(() => e.handleError(o)), o
        }) : r
    } catch (r) {
        throw t.runOutsideAngular(() => e.handleError(r)), r
    }
}
var jr = null;

function iD(e = [], t) {
    return Ye.create({
        name: t,
        providers: [{
            provide: ho,
            useValue: "platform"
        }, {
            provide: Ps,
            useValue: new Set([() => jr = null])
        }, ...e]
    })
}

function sD(e = []) {
    if (jr) return jr;
    let t = iD(e);
    return jr = t, Ey(), aD(t), t
}

function aD(e) {
    let t = e.get(na, null);
    Ee(e, () => {
        t?.forEach(n => n())
    })
}
var Ma = (() => {
    class e {
        static __NG_ELEMENT_ID__ = cD
    }
    return e
})();

function cD(e) {
    return uD($e(), B(), (e & 16) === 16)
}

function uD(e, t, n) {
    if (Ut(e) && !n) {
        let r = Pe(e.index, t);
        return new Mn(r, r)
    } else if (e.type & 175) {
        let r = t[we];
        return new Mn(r, t)
    }
    return null
}

function yf(e) {
    V(8);
    try {
        let {
            rootComponent: t,
            appProviders: n,
            platformProviders: r
        } = e, o = sD(r), i = [hf({}), {
            provide: bn,
            useExisting: Xy
        }, ...n || []], s = new io({
            providers: i,
            parent: o,
            debugName: "",
            runEnvironmentInitializers: !1
        });
        return nD({
            r3Injector: s.injector,
            platformInjector: o,
            rootComponent: t
        })
    } catch (t) {
        return Promise.reject(t)
    } finally {
        V(9)
    }
}
var Zu = class {
    [Et];
    constructor(t) {
        this[Et] = t
    }
    destroy() {
        this[Et].destroy()
    }
};
var ee = new D("");
var Ef = null;

function He() {
    return Ef
}

function _a(e) {
    Ef ??= e
}
var Bn = class {},
    Ta = (() => {
        class e {
            historyGo(n) {
                throw new Error("")
            }
            static \u0275fac = function(r) {
                return new(r || e)
            };
            static \u0275prov = w({
                token: e,
                factory: () => g(Cf),
                providedIn: "platform"
            })
        }
        return e
    })();
var Cf = (() => {
    class e extends Ta {
        _location;
        _history;
        _doc = g(ee);
        constructor() {
            super(), this._location = window.location, this._history = window.history
        }
        getBaseHrefFromDOM() {
            return He().getBaseHref(this._doc)
        }
        onPopState(n) {
            let r = He().getGlobalEventTarget(this._doc, "window");
            return r.addEventListener("popstate", n, !1), () => r.removeEventListener("popstate", n)
        }
        onHashChange(n) {
            let r = He().getGlobalEventTarget(this._doc, "window");
            return r.addEventListener("hashchange", n, !1), () => r.removeEventListener("hashchange", n)
        }
        get href() {
            return this._location.href
        }
        get protocol() {
            return this._location.protocol
        }
        get hostname() {
            return this._location.hostname
        }
        get port() {
            return this._location.port
        }
        get pathname() {
            return this._location.pathname
        }
        get search() {
            return this._location.search
        }
        get hash() {
            return this._location.hash
        }
        set pathname(n) {
            this._location.pathname = n
        }
        pushState(n, r, o) {
            this._history.pushState(n, r, o)
        }
        replaceState(n, r, o) {
            this._history.replaceState(n, r, o)
        }
        forward() {
            this._history.forward()
        }
        back() {
            this._history.back()
        }
        historyGo(n = 0) {
            this._history.go(n)
        }
        getState() {
            return this._history.state
        }
        static \u0275fac = function(r) {
            return new(r || e)
        };
        static \u0275prov = w({
            token: e,
            factory: () => new e,
            providedIn: "platform"
        })
    }
    return e
})();

function If(e, t) {
    return e ? t ? e.endsWith("/") ? t.startsWith("/") ? e + t.slice(1) : e + t : t.startsWith("/") ? e + t : `${e}/${t}` : e : t
}

function Df(e) {
    let t = e.search(/#|\?|$/);
    return e[t - 1] === "/" ? e.slice(0, t - 1) + e.slice(t) : e
}

function Je(e) {
    return e && e[0] !== "?" ? `?${e}` : e
}
var Oo = (() => {
        class e {
            historyGo(n) {
                throw new Error("")
            }
            static \u0275fac = function(r) {
                return new(r || e)
            };
            static \u0275prov = w({
                token: e,
                factory: () => g(Sf),
                providedIn: "root"
            })
        }
        return e
    })(),
    bf = new D(""),
    Sf = (() => {
        class e extends Oo {
            _platformLocation;
            _baseHref;
            _removeListenerFns = [];
            constructor(n, r) {
                super(), this._platformLocation = n, this._baseHref = r ?? this._platformLocation.getBaseHrefFromDOM() ?? g(ee).location?.origin ?? ""
            }
            ngOnDestroy() {
                for (; this._removeListenerFns.length;) this._removeListenerFns.pop()()
            }
            onPopState(n) {
                this._removeListenerFns.push(this._platformLocation.onPopState(n), this._platformLocation.onHashChange(n))
            }
            getBaseHref() {
                return this._baseHref
            }
            prepareExternalUrl(n) {
                return If(this._baseHref, n)
            }
            path(n = !1) {
                let r = this._platformLocation.pathname + Je(this._platformLocation.search),
                    o = this._platformLocation.hash;
                return o && n ? `${r}${o}` : r
            }
            pushState(n, r, o, i) {
                let s = this.prepareExternalUrl(o + Je(i));
                this._platformLocation.pushState(n, r, s)
            }
            replaceState(n, r, o, i) {
                let s = this.prepareExternalUrl(o + Je(i));
                this._platformLocation.replaceState(n, r, s)
            }
            forward() {
                this._platformLocation.forward()
            }
            back() {
                this._platformLocation.back()
            }
            getState() {
                return this._platformLocation.getState()
            }
            historyGo(n = 0) {
                this._platformLocation.historyGo?.(n)
            }
            static \u0275fac = function(r) {
                return new(r || e)(_(Ta), _(bf, 8))
            };
            static \u0275prov = w({
                token: e,
                factory: e.\u0275fac,
                providedIn: "root"
            })
        }
        return e
    })(),
    Qt = (() => {
        class e {
            _subject = new q;
            _basePath;
            _locationStrategy;
            _urlChangeListeners = [];
            _urlChangeSubscription = null;
            constructor(n) {
                this._locationStrategy = n;
                let r = this._locationStrategy.getBaseHref();
                this._basePath = fD(Df(wf(r))), this._locationStrategy.onPopState(o => {
                    this._subject.next({
                        url: this.path(!0),
                        pop: !0,
                        state: o.state,
                        type: o.type
                    })
                })
            }
            ngOnDestroy() {
                this._urlChangeSubscription?.unsubscribe(), this._urlChangeListeners = []
            }
            path(n = !1) {
                return this.normalize(this._locationStrategy.path(n))
            }
            getState() {
                return this._locationStrategy.getState()
            }
            isCurrentPathEqualTo(n, r = "") {
                return this.path() == this.normalize(n + Je(r))
            }
            normalize(n) {
                return e.stripTrailingSlash(dD(this._basePath, wf(n)))
            }
            prepareExternalUrl(n) {
                return n && n[0] !== "/" && (n = "/" + n), this._locationStrategy.prepareExternalUrl(n)
            }
            go(n, r = "", o = null) {
                this._locationStrategy.pushState(o, "", n, r), this._notifyUrlChangeListeners(this.prepareExternalUrl(n + Je(r)), o)
            }
            replaceState(n, r = "", o = null) {
                this._locationStrategy.replaceState(o, "", n, r), this._notifyUrlChangeListeners(this.prepareExternalUrl(n + Je(r)), o)
            }
            forward() {
                this._locationStrategy.forward()
            }
            back() {
                this._locationStrategy.back()
            }
            historyGo(n = 0) {
                this._locationStrategy.historyGo?.(n)
            }
            onUrlChange(n) {
                return this._urlChangeListeners.push(n), this._urlChangeSubscription ??= this.subscribe(r => {
                    this._notifyUrlChangeListeners(r.url, r.state)
                }), () => {
                    let r = this._urlChangeListeners.indexOf(n);
                    this._urlChangeListeners.splice(r, 1), this._urlChangeListeners.length === 0 && (this._urlChangeSubscription?.unsubscribe(), this._urlChangeSubscription = null)
                }
            }
            _notifyUrlChangeListeners(n = "", r) {
                this._urlChangeListeners.forEach(o => o(n, r))
            }
            subscribe(n, r, o) {
                return this._subject.subscribe({
                    next: n,
                    error: r ?? void 0,
                    complete: o ?? void 0
                })
            }
            static normalizeQueryParams = Je;
            static joinWithSlash = If;
            static stripTrailingSlash = Df;
            static \u0275fac = function(r) {
                return new(r || e)(_(Oo))
            };
            static \u0275prov = w({
                token: e,
                factory: () => lD(),
                providedIn: "root"
            })
        }
        return e
    })();

function lD() {
    return new Qt(_(Oo))
}

function dD(e, t) {
    if (!e || !t.startsWith(e)) return t;
    let n = t.substring(e.length);
    return n === "" || ["/", ";", "?", "#"].includes(n[0]) ? n : t
}

function wf(e) {
    return e.replace(/\/index.html$/, "")
}

function fD(e) {
    if (new RegExp("^(https?:)?//").test(e)) {
        let [, n] = e.split(/\/\/[^\/]+/);
        return n
    }
    return e
}
var ko = (() => {
    class e {
        static \u0275fac = function(r) {
            return new(r || e)
        };
        static \u0275mod = Ro({
            type: e
        });
        static \u0275inj = lo({})
    }
    return e
})();

function Na(e, t) {
    t = encodeURIComponent(t);
    for (let n of e.split(";")) {
        let r = n.indexOf("="),
            [o, i] = r == -1 ? [n, ""] : [n.slice(0, r), n.slice(r + 1)];
        if (o.trim() === t) return decodeURIComponent(i)
    }
    return null
}
var xa = "browser",
    Mf = "server";

function Po(e) {
    return e === Mf
}
var $n = class {};
var jo = new D(""),
    ka = (() => {
        class e {
            _zone;
            _plugins;
            _eventNameToPlugin = new Map;
            constructor(n, r) {
                this._zone = r, n.forEach(o => {
                    o.manager = this
                }), this._plugins = n.slice().reverse()
            }
            addEventListener(n, r, o, i) {
                return this._findPluginFor(r).addEventListener(n, r, o, i)
            }
            getZone() {
                return this._zone
            }
            _findPluginFor(n) {
                let r = this._eventNameToPlugin.get(n);
                if (r) return r;
                if (r = this._plugins.find(i => i.supports(n)), !r) throw new v(5101, !1);
                return this._eventNameToPlugin.set(n, r), r
            }
            static \u0275fac = function(r) {
                return new(r || e)(_(jo), _(W))
            };
            static \u0275prov = w({
                token: e,
                factory: e.\u0275fac
            })
        }
        return e
    })(),
    Hn = class {
        _doc;
        constructor(t) {
            this._doc = t
        }
        manager
    },
    Fo = "ng-app-id";

function _f(e) {
    for (let t of e) t.remove()
}

function Tf(e, t) {
    let n = t.createElement("style");
    return n.textContent = e, n
}

function hD(e, t, n, r) {
    let o = e.head?.querySelectorAll(`style[${Fo}="${t}"],link[${Fo}="${t}"]`);
    if (o)
        for (let i of o) i.removeAttribute(Fo), i instanceof HTMLLinkElement ? r.set(i.href.slice(i.href.lastIndexOf("/") + 1), {
            usage: 0,
            elements: [i]
        }) : i.textContent && n.set(i.textContent, {
            usage: 0,
            elements: [i]
        })
}

function Aa(e, t) {
    let n = t.createElement("link");
    return n.setAttribute("rel", "stylesheet"), n.setAttribute("href", e), n
}
var Pa = (() => {
        class e {
            doc;
            appId;
            nonce;
            inline = new Map;
            external = new Map;
            hosts = new Set;
            isServer;
            constructor(n, r, o, i = {}) {
                this.doc = n, this.appId = r, this.nonce = o, this.isServer = Po(i), hD(n, r, this.inline, this.external), this.hosts.add(n.head)
            }
            addStyles(n, r) {
                for (let o of n) this.addUsage(o, this.inline, Tf);
                r?.forEach(o => this.addUsage(o, this.external, Aa))
            }
            removeStyles(n, r) {
                for (let o of n) this.removeUsage(o, this.inline);
                r?.forEach(o => this.removeUsage(o, this.external))
            }
            addUsage(n, r, o) {
                let i = r.get(n);
                i ? i.usage++ : r.set(n, {
                    usage: 1,
                    elements: [...this.hosts].map(s => this.addElement(s, o(n, this.doc)))
                })
            }
            removeUsage(n, r) {
                let o = r.get(n);
                o && (o.usage--, o.usage <= 0 && (_f(o.elements), r.delete(n)))
            }
            ngOnDestroy() {
                for (let [, {
                        elements: n
                    }] of [...this.inline, ...this.external]) _f(n);
                this.hosts.clear()
            }
            addHost(n) {
                this.hosts.add(n);
                for (let [r, {
                        elements: o
                    }] of this.inline) o.push(this.addElement(n, Tf(r, this.doc)));
                for (let [r, {
                        elements: o
                    }] of this.external) o.push(this.addElement(n, Aa(r, this.doc)))
            }
            removeHost(n) {
                this.hosts.delete(n)
            }
            addElement(n, r) {
                return this.nonce && r.setAttribute("nonce", this.nonce), this.isServer && r.setAttribute(Fo, this.appId), n.appendChild(r)
            }
            static \u0275fac = function(r) {
                return new(r || e)(_(ee), _(wo), _(ra, 8), _(Pn))
            };
            static \u0275prov = w({
                token: e,
                factory: e.\u0275fac
            })
        }
        return e
    })(),
    Ra = {
        svg: "http://www.w3.org/2000/svg",
        xhtml: "http://www.w3.org/1999/xhtml",
        xlink: "http://www.w3.org/1999/xlink",
        xml: "http://www.w3.org/XML/1998/namespace",
        xmlns: "http://www.w3.org/2000/xmlns/",
        math: "http://www.w3.org/1998/Math/MathML"
    },
    Fa = /%COMP%/g;
var xf = "%COMP%",
    gD = `_nghost-${xf}`,
    mD = `_ngcontent-${xf}`,
    vD = !0,
    yD = new D("", {
        providedIn: "root",
        factory: () => vD
    });

function DD(e) {
    return mD.replace(Fa, e)
}

function wD(e) {
    return gD.replace(Fa, e)
}

function Rf(e, t) {
    return t.map(n => n.replace(Fa, e))
}
var La = (() => {
        class e {
            eventManager;
            sharedStylesHost;
            appId;
            removeStylesOnCompDestroy;
            doc;
            platformId;
            ngZone;
            nonce;
            tracingService;
            rendererByCompId = new Map;
            defaultRenderer;
            platformIsServer;
            constructor(n, r, o, i, s, a, c, u = null, l = null) {
                this.eventManager = n, this.sharedStylesHost = r, this.appId = o, this.removeStylesOnCompDestroy = i, this.doc = s, this.platformId = a, this.ngZone = c, this.nonce = u, this.tracingService = l, this.platformIsServer = Po(a), this.defaultRenderer = new Un(n, s, c, this.platformIsServer, this.tracingService)
            }
            createRenderer(n, r) {
                if (!n || !r) return this.defaultRenderer;
                this.platformIsServer && r.encapsulation === Me.ShadowDom && (r = O(m({}, r), {
                    encapsulation: Me.Emulated
                }));
                let o = this.getOrCreateRenderer(n, r);
                return o instanceof Lo ? o.applyToHost(n) : o instanceof zn && o.applyStyles(), o
            }
            getOrCreateRenderer(n, r) {
                let o = this.rendererByCompId,
                    i = o.get(r.id);
                if (!i) {
                    let s = this.doc,
                        a = this.ngZone,
                        c = this.eventManager,
                        u = this.sharedStylesHost,
                        l = this.removeStylesOnCompDestroy,
                        f = this.platformIsServer,
                        p = this.tracingService;
                    switch (r.encapsulation) {
                        case Me.Emulated:
                            i = new Lo(c, u, r, this.appId, l, s, a, f, p);
                            break;
                        case Me.ShadowDom:
                            return new Oa(c, u, n, r, s, a, this.nonce, f, p);
                        default:
                            i = new zn(c, u, r, l, s, a, f, p);
                            break
                    }
                    o.set(r.id, i)
                }
                return i
            }
            ngOnDestroy() {
                this.rendererByCompId.clear()
            }
            componentReplaced(n) {
                this.rendererByCompId.delete(n)
            }
            static \u0275fac = function(r) {
                return new(r || e)(_(ka), _(Pa), _(wo), _(yD), _(ee), _(Pn), _(W), _(ra), _(Eo, 8))
            };
            static \u0275prov = w({
                token: e,
                factory: e.\u0275fac
            })
        }
        return e
    })(),
    Un = class {
        eventManager;
        doc;
        ngZone;
        platformIsServer;
        tracingService;
        data = Object.create(null);
        throwOnSyntheticProps = !0;
        constructor(t, n, r, o, i) {
            this.eventManager = t, this.doc = n, this.ngZone = r, this.platformIsServer = o, this.tracingService = i
        }
        destroy() {}
        destroyNode = null;
        createElement(t, n) {
            return n ? this.doc.createElementNS(Ra[n] || n, t) : this.doc.createElement(t)
        }
        createComment(t) {
            return this.doc.createComment(t)
        }
        createText(t) {
            return this.doc.createTextNode(t)
        }
        appendChild(t, n) {
            (Nf(t) ? t.content : t).appendChild(n)
        }
        insertBefore(t, n, r) {
            t && (Nf(t) ? t.content : t).insertBefore(n, r)
        }
        removeChild(t, n) {
            n.remove()
        }
        selectRootElement(t, n) {
            let r = typeof t == "string" ? this.doc.querySelector(t) : t;
            if (!r) throw new v(-5104, !1);
            return n || (r.textContent = ""), r
        }
        parentNode(t) {
            return t.parentNode
        }
        nextSibling(t) {
            return t.nextSibling
        }
        setAttribute(t, n, r, o) {
            if (o) {
                n = o + ":" + n;
                let i = Ra[o];
                i ? t.setAttributeNS(i, n, r) : t.setAttribute(n, r)
            } else t.setAttribute(n, r)
        }
        removeAttribute(t, n, r) {
            if (r) {
                let o = Ra[r];
                o ? t.removeAttributeNS(o, n) : t.removeAttribute(`${r}:${n}`)
            } else t.removeAttribute(n)
        }
        addClass(t, n) {
            t.classList.add(n)
        }
        removeClass(t, n) {
            t.classList.remove(n)
        }
        setStyle(t, n, r, o) {
            o & (Ke.DashCase | Ke.Important) ? t.style.setProperty(n, r, o & Ke.Important ? "important" : "") : t.style[n] = r
        }
        removeStyle(t, n, r) {
            r & Ke.DashCase ? t.style.removeProperty(n) : t.style[n] = ""
        }
        setProperty(t, n, r) {
            t != null && (t[n] = r)
        }
        setValue(t, n) {
            t.nodeValue = n
        }
        listen(t, n, r, o) {
            if (typeof t == "string" && (t = He().getGlobalEventTarget(this.doc, t), !t)) throw new v(5102, !1);
            let i = this.decoratePreventDefault(r);
            return this.tracingService?.wrapEventListener && (i = this.tracingService.wrapEventListener(t, n, i)), this.eventManager.addEventListener(t, n, i, o)
        }
        decoratePreventDefault(t) {
            return n => {
                if (n === "__ngUnwrap__") return t;
                (this.platformIsServer ? this.ngZone.runGuarded(() => t(n)) : t(n)) === !1 && n.preventDefault()
            }
        }
    };

function Nf(e) {
    return e.tagName === "TEMPLATE" && e.content !== void 0
}
var Oa = class extends Un {
        sharedStylesHost;
        hostEl;
        shadowRoot;
        constructor(t, n, r, o, i, s, a, c, u) {
            super(t, i, s, c, u), this.sharedStylesHost = n, this.hostEl = r, this.shadowRoot = r.attachShadow({
                mode: "open"
            }), this.sharedStylesHost.addHost(this.shadowRoot);
            let l = o.styles;
            l = Rf(o.id, l);
            for (let p of l) {
                let d = document.createElement("style");
                a && d.setAttribute("nonce", a), d.textContent = p, this.shadowRoot.appendChild(d)
            }
            let f = o.getExternalStyles?.();
            if (f)
                for (let p of f) {
                    let d = Aa(p, i);
                    a && d.setAttribute("nonce", a), this.shadowRoot.appendChild(d)
                }
        }
        nodeOrShadowRoot(t) {
            return t === this.hostEl ? this.shadowRoot : t
        }
        appendChild(t, n) {
            return super.appendChild(this.nodeOrShadowRoot(t), n)
        }
        insertBefore(t, n, r) {
            return super.insertBefore(this.nodeOrShadowRoot(t), n, r)
        }
        removeChild(t, n) {
            return super.removeChild(null, n)
        }
        parentNode(t) {
            return this.nodeOrShadowRoot(super.parentNode(this.nodeOrShadowRoot(t)))
        }
        destroy() {
            this.sharedStylesHost.removeHost(this.shadowRoot)
        }
    },
    zn = class extends Un {
        sharedStylesHost;
        removeStylesOnCompDestroy;
        styles;
        styleUrls;
        constructor(t, n, r, o, i, s, a, c, u) {
            super(t, i, s, a, c), this.sharedStylesHost = n, this.removeStylesOnCompDestroy = o;
            let l = r.styles;
            this.styles = u ? Rf(u, l) : l, this.styleUrls = r.getExternalStyles?.(u)
        }
        applyStyles() {
            this.sharedStylesHost.addStyles(this.styles, this.styleUrls)
        }
        destroy() {
            this.removeStylesOnCompDestroy && this.sharedStylesHost.removeStyles(this.styles, this.styleUrls)
        }
    },
    Lo = class extends zn {
        contentAttr;
        hostAttr;
        constructor(t, n, r, o, i, s, a, c, u) {
            let l = o + "-" + r.id;
            super(t, n, r, i, s, a, c, u, l), this.contentAttr = DD(l), this.hostAttr = wD(l)
        }
        applyToHost(t) {
            this.applyStyles(), this.setAttribute(t, this.hostAttr, "")
        }
        createElement(t, n) {
            let r = super.createElement(t, n);
            return super.setAttribute(r, this.contentAttr, ""), r
        }
    };
var Vo = class e extends Bn {
        supportsDOMEvents = !0;
        static makeCurrent() {
            _a(new e)
        }
        onAndCancel(t, n, r, o) {
            return t.addEventListener(n, r, o), () => {
                t.removeEventListener(n, r, o)
            }
        }
        dispatchEvent(t, n) {
            t.dispatchEvent(n)
        }
        remove(t) {
            t.remove()
        }
        createElement(t, n) {
            return n = n || this.getDefaultDocument(), n.createElement(t)
        }
        createHtmlDocument() {
            return document.implementation.createHTMLDocument("fakeTitle")
        }
        getDefaultDocument() {
            return document
        }
        isElementNode(t) {
            return t.nodeType === Node.ELEMENT_NODE
        }
        isShadowRoot(t) {
            return t instanceof DocumentFragment
        }
        getGlobalEventTarget(t, n) {
            return n === "window" ? window : n === "document" ? t : n === "body" ? t.body : null
        }
        getBaseHref(t) {
            let n = ED();
            return n == null ? null : CD(n)
        }
        resetBaseElement() {
            qn = null
        }
        getUserAgent() {
            return window.navigator.userAgent
        }
        getCookie(t) {
            return Na(document.cookie, t)
        }
    },
    qn = null;

function ED() {
    return qn = qn || document.querySelector("base"), qn ? qn.getAttribute("href") : null
}

function CD(e) {
    return new URL(e, document.baseURI).pathname
}
var ID = (() => {
        class e {
            build() {
                return new XMLHttpRequest
            }
            static \u0275fac = function(r) {
                return new(r || e)
            };
            static \u0275prov = w({
                token: e,
                factory: e.\u0275fac
            })
        }
        return e
    })(),
    Of = (() => {
        class e extends Hn {
            constructor(n) {
                super(n)
            }
            supports(n) {
                return !0
            }
            addEventListener(n, r, o, i) {
                return n.addEventListener(r, o, i), () => this.removeEventListener(n, r, o, i)
            }
            removeEventListener(n, r, o, i) {
                return n.removeEventListener(r, o, i)
            }
            static \u0275fac = function(r) {
                return new(r || e)(_(ee))
            };
            static \u0275prov = w({
                token: e,
                factory: e.\u0275fac
            })
        }
        return e
    })(),
    Af = ["alt", "control", "meta", "shift"],
    bD = {
        "\b": "Backspace",
        "	": "Tab",
        "\x7F": "Delete",
        "\x1B": "Escape",
        Del: "Delete",
        Esc: "Escape",
        Left: "ArrowLeft",
        Right: "ArrowRight",
        Up: "ArrowUp",
        Down: "ArrowDown",
        Menu: "ContextMenu",
        Scroll: "ScrollLock",
        Win: "OS"
    },
    SD = {
        alt: e => e.altKey,
        control: e => e.ctrlKey,
        meta: e => e.metaKey,
        shift: e => e.shiftKey
    },
    kf = (() => {
        class e extends Hn {
            constructor(n) {
                super(n)
            }
            supports(n) {
                return e.parseEventName(n) != null
            }
            addEventListener(n, r, o, i) {
                let s = e.parseEventName(r),
                    a = e.eventCallback(s.fullKey, o, this.manager.getZone());
                return this.manager.getZone().runOutsideAngular(() => He().onAndCancel(n, s.domEventName, a, i))
            }
            static parseEventName(n) {
                let r = n.toLowerCase().split("."),
                    o = r.shift();
                if (r.length === 0 || !(o === "keydown" || o === "keyup")) return null;
                let i = e._normalizeKey(r.pop()),
                    s = "",
                    a = r.indexOf("code");
                if (a > -1 && (r.splice(a, 1), s = "code."), Af.forEach(u => {
                        let l = r.indexOf(u);
                        l > -1 && (r.splice(l, 1), s += u + ".")
                    }), s += i, r.length != 0 || i.length === 0) return null;
                let c = {};
                return c.domEventName = o, c.fullKey = s, c
            }
            static matchEventFullKeyCode(n, r) {
                let o = bD[n.key] || n.key,
                    i = "";
                return r.indexOf("code.") > -1 && (o = n.code, i = "code."), o == null || !o ? !1 : (o = o.toLowerCase(), o === " " ? o = "space" : o === "." && (o = "dot"), Af.forEach(s => {
                    if (s !== o) {
                        let a = SD[s];
                        a(n) && (i += s + ".")
                    }
                }), i += o, i === r)
            }
            static eventCallback(n, r, o) {
                return i => {
                    e.matchEventFullKeyCode(i, n) && o.runGuarded(() => r(i))
                }
            }
            static _normalizeKey(n) {
                return n === "esc" ? "escape" : n
            }
            static \u0275fac = function(r) {
                return new(r || e)(_(ee))
            };
            static \u0275prov = w({
                token: e,
                factory: e.\u0275fac
            })
        }
        return e
    })();

function ja(e, t) {
    return yf(m({
        rootComponent: e
    }, MD(t)))
}

function MD(e) {
    return {
        appProviders: [...RD, ...e?.providers ?? []],
        platformProviders: xD
    }
}

function _D() {
    Vo.makeCurrent()
}

function TD() {
    return new Fe
}

function ND() {
    return ld(document), document
}
var xD = [{
    provide: Pn,
    useValue: xa
}, {
    provide: na,
    useValue: _D,
    multi: !0
}, {
    provide: ee,
    useFactory: ND
}];
var RD = [{
        provide: ho,
        useValue: "root"
    }, {
        provide: Fe,
        useFactory: TD
    }, {
        provide: jo,
        useClass: Of,
        multi: !0,
        deps: [ee]
    }, {
        provide: jo,
        useClass: kf,
        multi: !0,
        deps: [ee]
    }, La, Pa, ka, {
        provide: $t,
        useExisting: La
    }, {
        provide: $n,
        useClass: ID
    },
    []
];
var Pf = (() => {
    class e {
        _doc;
        constructor(n) {
            this._doc = n
        }
        getTitle() {
            return this._doc.title
        }
        setTitle(n) {
            this._doc.title = n || ""
        }
        static \u0275fac = function(r) {
            return new(r || e)(_(ee))
        };
        static \u0275prov = w({
            token: e,
            factory: e.\u0275fac,
            providedIn: "root"
        })
    }
    return e
})();
var S = "primary",
    rr = Symbol("RouteTitle"),
    Ua = class {
        params;
        constructor(t) {
            this.params = t || {}
        }
        has(t) {
            return Object.prototype.hasOwnProperty.call(this.params, t)
        }
        get(t) {
            if (this.has(t)) {
                let n = this.params[t];
                return Array.isArray(n) ? n[0] : n
            }
            return null
        }
        getAll(t) {
            if (this.has(t)) {
                let n = this.params[t];
                return Array.isArray(n) ? n : [n]
            }
            return []
        }
        get keys() {
            return Object.keys(this.params)
        }
    };

function tn(e) {
    return new Ua(e)
}

function OD(e, t, n) {
    let r = n.path.split("/");
    if (r.length > e.length || n.pathMatch === "full" && (t.hasChildren() || r.length < e.length)) return null;
    let o = {};
    for (let i = 0; i < r.length; i++) {
        let s = r[i],
            a = e[i];
        if (s[0] === ":") o[s.substring(1)] = a;
        else if (s !== a.path) return null
    }
    return {
        consumed: e.slice(0, r.length),
        posParams: o
    }
}

function kD(e, t) {
    if (e.length !== t.length) return !1;
    for (let n = 0; n < e.length; ++n)
        if (!_e(e[n], t[n])) return !1;
    return !0
}

function _e(e, t) {
    let n = e ? za(e) : void 0,
        r = t ? za(t) : void 0;
    if (!n || !r || n.length != r.length) return !1;
    let o;
    for (let i = 0; i < n.length; i++)
        if (o = n[i], !Uf(e[o], t[o])) return !1;
    return !0
}

function za(e) {
    return [...Object.keys(e), ...Object.getOwnPropertySymbols(e)]
}

function Uf(e, t) {
    if (Array.isArray(e) && Array.isArray(t)) {
        if (e.length !== t.length) return !1;
        let n = [...e].sort(),
            r = [...t].sort();
        return n.every((o, i) => r[i] === o)
    } else return e === t
}

function zf(e) {
    return e.length > 0 ? e[e.length - 1] : null
}

function tt(e) {
    return Ni(e) ? e : Ao(e) ? H(Promise.resolve(e)) : C(e)
}
var PD = {
        exact: Gf,
        subset: Wf
    },
    qf = {
        exact: FD,
        subset: LD,
        ignored: () => !0
    };

function Ff(e, t, n) {
    return PD[n.paths](e.root, t.root, n.matrixParams) && qf[n.queryParams](e.queryParams, t.queryParams) && !(n.fragment === "exact" && e.fragment !== t.fragment)
}

function FD(e, t) {
    return _e(e, t)
}

function Gf(e, t, n) {
    if (!yt(e.segments, t.segments) || !Ho(e.segments, t.segments, n) || e.numberOfChildren !== t.numberOfChildren) return !1;
    for (let r in t.children)
        if (!e.children[r] || !Gf(e.children[r], t.children[r], n)) return !1;
    return !0
}

function LD(e, t) {
    return Object.keys(t).length <= Object.keys(e).length && Object.keys(t).every(n => Uf(e[n], t[n]))
}

function Wf(e, t, n) {
    return Zf(e, t, t.segments, n)
}

function Zf(e, t, n, r) {
    if (e.segments.length > n.length) {
        let o = e.segments.slice(0, n.length);
        return !(!yt(o, n) || t.hasChildren() || !Ho(o, n, r))
    } else if (e.segments.length === n.length) {
        if (!yt(e.segments, n) || !Ho(e.segments, n, r)) return !1;
        for (let o in t.children)
            if (!e.children[o] || !Wf(e.children[o], t.children[o], r)) return !1;
        return !0
    } else {
        let o = n.slice(0, e.segments.length),
            i = n.slice(e.segments.length);
        return !yt(e.segments, o) || !Ho(e.segments, o, r) || !e.children[S] ? !1 : Zf(e.children[S], t, i, r)
    }
}

function Ho(e, t, n) {
    return t.every((r, o) => qf[n](e[o].parameters, r.parameters))
}
var ze = class {
        root;
        queryParams;
        fragment;
        _queryParamMap;
        constructor(t = new k([], {}), n = {}, r = null) {
            this.root = t, this.queryParams = n, this.fragment = r
        }
        get queryParamMap() {
            return this._queryParamMap ??= tn(this.queryParams), this._queryParamMap
        }
        toString() {
            return BD.serialize(this)
        }
    },
    k = class {
        segments;
        children;
        parent = null;
        constructor(t, n) {
            this.segments = t, this.children = n, Object.values(n).forEach(r => r.parent = this)
        }
        hasChildren() {
            return this.numberOfChildren > 0
        }
        get numberOfChildren() {
            return Object.keys(this.children).length
        }
        toString() {
            return Uo(this)
        }
    },
    vt = class {
        path;
        parameters;
        _parameterMap;
        constructor(t, n) {
            this.path = t, this.parameters = n
        }
        get parameterMap() {
            return this._parameterMap ??= tn(this.parameters), this._parameterMap
        }
        toString() {
            return Yf(this)
        }
    };

function jD(e, t) {
    return yt(e, t) && e.every((n, r) => _e(n.parameters, t[r].parameters))
}

function yt(e, t) {
    return e.length !== t.length ? !1 : e.every((n, r) => n.path === t[r].path)
}

function VD(e, t) {
    let n = [];
    return Object.entries(e.children).forEach(([r, o]) => {
        r === S && (n = n.concat(t(o, r)))
    }), Object.entries(e.children).forEach(([r, o]) => {
        r !== S && (n = n.concat(t(o, r)))
    }), n
}
var ni = (() => {
        class e {
            static \u0275fac = function(r) {
                return new(r || e)
            };
            static \u0275prov = w({
                token: e,
                factory: () => new nn,
                providedIn: "root"
            })
        }
        return e
    })(),
    nn = class {
        parse(t) {
            let n = new Ga(t);
            return new ze(n.parseRootSegment(), n.parseQueryParams(), n.parseFragment())
        }
        serialize(t) {
            let n = `/${Gn(t.root,!0)}`,
                r = UD(t.queryParams),
                o = typeof t.fragment == "string" ? `#${$D(t.fragment)}` : "";
            return `${n}${r}${o}`
        }
    },
    BD = new nn;

function Uo(e) {
    return e.segments.map(t => Yf(t)).join("/")
}

function Gn(e, t) {
    if (!e.hasChildren()) return Uo(e);
    if (t) {
        let n = e.children[S] ? Gn(e.children[S], !1) : "",
            r = [];
        return Object.entries(e.children).forEach(([o, i]) => {
            o !== S && r.push(`${o}:${Gn(i,!1)}`)
        }), r.length > 0 ? `${n}(${r.join("//")})` : n
    } else {
        let n = VD(e, (r, o) => o === S ? [Gn(e.children[S], !1)] : [`${o}:${Gn(r,!1)}`]);
        return Object.keys(e.children).length === 1 && e.children[S] != null ? `${Uo(e)}/${n[0]}` : `${Uo(e)}/(${n.join("//")})`
    }
}

function Qf(e) {
    return encodeURIComponent(e).replace(/%40/g, "@").replace(/%3A/gi, ":").replace(/%24/g, "$").replace(/%2C/gi, ",")
}

function Bo(e) {
    return Qf(e).replace(/%3B/gi, ";")
}

function $D(e) {
    return encodeURI(e)
}

function qa(e) {
    return Qf(e).replace(/\(/g, "%28").replace(/\)/g, "%29").replace(/%26/gi, "&")
}

function zo(e) {
    return decodeURIComponent(e)
}

function Lf(e) {
    return zo(e.replace(/\+/g, "%20"))
}

function Yf(e) {
    return `${qa(e.path)}${HD(e.parameters)}`
}

function HD(e) {
    return Object.entries(e).map(([t, n]) => `;${qa(t)}=${qa(n)}`).join("")
}

function UD(e) {
    let t = Object.entries(e).map(([n, r]) => Array.isArray(r) ? r.map(o => `${Bo(n)}=${Bo(o)}`).join("&") : `${Bo(n)}=${Bo(r)}`).filter(n => n);
    return t.length ? `?${t.join("&")}` : ""
}
var zD = /^[^\/()?;#]+/;

function Va(e) {
    let t = e.match(zD);
    return t ? t[0] : ""
}
var qD = /^[^\/()?;=#]+/;

function GD(e) {
    let t = e.match(qD);
    return t ? t[0] : ""
}
var WD = /^[^=?&#]+/;

function ZD(e) {
    let t = e.match(WD);
    return t ? t[0] : ""
}
var QD = /^[^&#]+/;

function YD(e) {
    let t = e.match(QD);
    return t ? t[0] : ""
}
var Ga = class {
    url;
    remaining;
    constructor(t) {
        this.url = t, this.remaining = t
    }
    parseRootSegment() {
        return this.consumeOptional("/"), this.remaining === "" || this.peekStartsWith("?") || this.peekStartsWith("#") ? new k([], {}) : new k([], this.parseChildren())
    }
    parseQueryParams() {
        let t = {};
        if (this.consumeOptional("?"))
            do this.parseQueryParam(t); while (this.consumeOptional("&"));
        return t
    }
    parseFragment() {
        return this.consumeOptional("#") ? decodeURIComponent(this.remaining) : null
    }
    parseChildren() {
        if (this.remaining === "") return {};
        this.consumeOptional("/");
        let t = [];
        for (this.peekStartsWith("(") || t.push(this.parseSegment()); this.peekStartsWith("/") && !this.peekStartsWith("//") && !this.peekStartsWith("/(");) this.capture("/"), t.push(this.parseSegment());
        let n = {};
        this.peekStartsWith("/(") && (this.capture("/"), n = this.parseParens(!0));
        let r = {};
        return this.peekStartsWith("(") && (r = this.parseParens(!1)), (t.length > 0 || Object.keys(n).length > 0) && (r[S] = new k(t, n)), r
    }
    parseSegment() {
        let t = Va(this.remaining);
        if (t === "" && this.peekStartsWith(";")) throw new v(4009, !1);
        return this.capture(t), new vt(zo(t), this.parseMatrixParams())
    }
    parseMatrixParams() {
        let t = {};
        for (; this.consumeOptional(";");) this.parseParam(t);
        return t
    }
    parseParam(t) {
        let n = GD(this.remaining);
        if (!n) return;
        this.capture(n);
        let r = "";
        if (this.consumeOptional("=")) {
            let o = Va(this.remaining);
            o && (r = o, this.capture(r))
        }
        t[zo(n)] = zo(r)
    }
    parseQueryParam(t) {
        let n = ZD(this.remaining);
        if (!n) return;
        this.capture(n);
        let r = "";
        if (this.consumeOptional("=")) {
            let s = YD(this.remaining);
            s && (r = s, this.capture(r))
        }
        let o = Lf(n),
            i = Lf(r);
        if (t.hasOwnProperty(o)) {
            let s = t[o];
            Array.isArray(s) || (s = [s], t[o] = s), s.push(i)
        } else t[o] = i
    }
    parseParens(t) {
        let n = {};
        for (this.capture("("); !this.consumeOptional(")") && this.remaining.length > 0;) {
            let r = Va(this.remaining),
                o = this.remaining[r.length];
            if (o !== "/" && o !== ")" && o !== ";") throw new v(4010, !1);
            let i;
            r.indexOf(":") > -1 ? (i = r.slice(0, r.indexOf(":")), this.capture(i), this.capture(":")) : t && (i = S);
            let s = this.parseChildren();
            n[i] = Object.keys(s).length === 1 ? s[S] : new k([], s), this.consumeOptional("//")
        }
        return n
    }
    peekStartsWith(t) {
        return this.remaining.startsWith(t)
    }
    consumeOptional(t) {
        return this.peekStartsWith(t) ? (this.remaining = this.remaining.substring(t.length), !0) : !1
    }
    capture(t) {
        if (!this.consumeOptional(t)) throw new v(4011, !1)
    }
};

function Kf(e) {
    return e.segments.length > 0 ? new k([], {
        [S]: e
    }) : e
}

function Jf(e) {
    let t = {};
    for (let [r, o] of Object.entries(e.children)) {
        let i = Jf(o);
        if (r === S && i.segments.length === 0 && i.hasChildren())
            for (let [s, a] of Object.entries(i.children)) t[s] = a;
        else(i.segments.length > 0 || i.hasChildren()) && (t[r] = i)
    }
    let n = new k(e.segments, t);
    return KD(n)
}

function KD(e) {
    if (e.numberOfChildren === 1 && e.children[S]) {
        let t = e.children[S];
        return new k(e.segments.concat(t.segments), t.children)
    }
    return e
}

function rn(e) {
    return e instanceof ze
}

function JD(e, t, n = null, r = null) {
    let o = Xf(e);
    return ep(o, t, n, r)
}

function Xf(e) {
    let t;

    function n(i) {
        let s = {};
        for (let c of i.children) {
            let u = n(c);
            s[c.outlet] = u
        }
        let a = new k(i.url, s);
        return i === e && (t = a), a
    }
    let r = n(e.root),
        o = Kf(r);
    return t ?? o
}

function ep(e, t, n, r) {
    let o = e;
    for (; o.parent;) o = o.parent;
    if (t.length === 0) return Ba(o, o, o, n, r);
    let i = XD(t);
    if (i.toRoot()) return Ba(o, o, new k([], {}), n, r);
    let s = ew(i, o, e),
        a = s.processChildren ? Zn(s.segmentGroup, s.index, i.commands) : np(s.segmentGroup, s.index, i.commands);
    return Ba(o, s.segmentGroup, a, n, r)
}

function Go(e) {
    return typeof e == "object" && e != null && !e.outlets && !e.segmentPath
}

function Yn(e) {
    return typeof e == "object" && e != null && e.outlets
}

function Ba(e, t, n, r, o) {
    let i = {};
    r && Object.entries(r).forEach(([c, u]) => {
        i[c] = Array.isArray(u) ? u.map(l => `${l}`) : `${u}`
    });
    let s;
    e === t ? s = n : s = tp(e, t, n);
    let a = Kf(Jf(s));
    return new ze(a, i, o)
}

function tp(e, t, n) {
    let r = {};
    return Object.entries(e.children).forEach(([o, i]) => {
        i === t ? r[o] = n : r[o] = tp(i, t, n)
    }), new k(e.segments, r)
}
var Wo = class {
    isAbsolute;
    numberOfDoubleDots;
    commands;
    constructor(t, n, r) {
        if (this.isAbsolute = t, this.numberOfDoubleDots = n, this.commands = r, t && r.length > 0 && Go(r[0])) throw new v(4003, !1);
        let o = r.find(Yn);
        if (o && o !== zf(r)) throw new v(4004, !1)
    }
    toRoot() {
        return this.isAbsolute && this.commands.length === 1 && this.commands[0] == "/"
    }
};

function XD(e) {
    if (typeof e[0] == "string" && e.length === 1 && e[0] === "/") return new Wo(!0, 0, e);
    let t = 0,
        n = !1,
        r = e.reduce((o, i, s) => {
            if (typeof i == "object" && i != null) {
                if (i.outlets) {
                    let a = {};
                    return Object.entries(i.outlets).forEach(([c, u]) => {
                        a[c] = typeof u == "string" ? u.split("/") : u
                    }), [...o, {
                        outlets: a
                    }]
                }
                if (i.segmentPath) return [...o, i.segmentPath]
            }
            return typeof i != "string" ? [...o, i] : s === 0 ? (i.split("/").forEach((a, c) => {
                c == 0 && a === "." || (c == 0 && a === "" ? n = !0 : a === ".." ? t++ : a != "" && o.push(a))
            }), o) : [...o, i]
        }, []);
    return new Wo(n, t, r)
}
var Jt = class {
    segmentGroup;
    processChildren;
    index;
    constructor(t, n, r) {
        this.segmentGroup = t, this.processChildren = n, this.index = r
    }
};

function ew(e, t, n) {
    if (e.isAbsolute) return new Jt(t, !0, 0);
    if (!n) return new Jt(t, !1, NaN);
    if (n.parent === null) return new Jt(n, !0, 0);
    let r = Go(e.commands[0]) ? 0 : 1,
        o = n.segments.length - 1 + r;
    return tw(n, o, e.numberOfDoubleDots)
}

function tw(e, t, n) {
    let r = e,
        o = t,
        i = n;
    for (; i > o;) {
        if (i -= o, r = r.parent, !r) throw new v(4005, !1);
        o = r.segments.length
    }
    return new Jt(r, !1, o - i)
}

function nw(e) {
    return Yn(e[0]) ? e[0].outlets : {
        [S]: e
    }
}

function np(e, t, n) {
    if (e ??= new k([], {}), e.segments.length === 0 && e.hasChildren()) return Zn(e, t, n);
    let r = rw(e, t, n),
        o = n.slice(r.commandIndex);
    if (r.match && r.pathIndex < e.segments.length) {
        let i = new k(e.segments.slice(0, r.pathIndex), {});
        return i.children[S] = new k(e.segments.slice(r.pathIndex), e.children), Zn(i, 0, o)
    } else return r.match && o.length === 0 ? new k(e.segments, {}) : r.match && !e.hasChildren() ? Wa(e, t, n) : r.match ? Zn(e, 0, o) : Wa(e, t, n)
}

function Zn(e, t, n) {
    if (n.length === 0) return new k(e.segments, {});
    {
        let r = nw(n),
            o = {};
        if (Object.keys(r).some(i => i !== S) && e.children[S] && e.numberOfChildren === 1 && e.children[S].segments.length === 0) {
            let i = Zn(e.children[S], t, n);
            return new k(e.segments, i.children)
        }
        return Object.entries(r).forEach(([i, s]) => {
            typeof s == "string" && (s = [s]), s !== null && (o[i] = np(e.children[i], t, s))
        }), Object.entries(e.children).forEach(([i, s]) => {
            r[i] === void 0 && (o[i] = s)
        }), new k(e.segments, o)
    }
}

function rw(e, t, n) {
    let r = 0,
        o = t,
        i = {
            match: !1,
            pathIndex: 0,
            commandIndex: 0
        };
    for (; o < e.segments.length;) {
        if (r >= n.length) return i;
        let s = e.segments[o],
            a = n[r];
        if (Yn(a)) break;
        let c = `${a}`,
            u = r < n.length - 1 ? n[r + 1] : null;
        if (o > 0 && c === void 0) break;
        if (c && u && typeof u == "object" && u.outlets === void 0) {
            if (!Vf(c, u, s)) return i;
            r += 2
        } else {
            if (!Vf(c, {}, s)) return i;
            r++
        }
        o++
    }
    return {
        match: !0,
        pathIndex: o,
        commandIndex: r
    }
}

function Wa(e, t, n) {
    let r = e.segments.slice(0, t),
        o = 0;
    for (; o < n.length;) {
        let i = n[o];
        if (Yn(i)) {
            let c = ow(i.outlets);
            return new k(r, c)
        }
        if (o === 0 && Go(n[0])) {
            let c = e.segments[t];
            r.push(new vt(c.path, jf(n[0]))), o++;
            continue
        }
        let s = Yn(i) ? i.outlets[S] : `${i}`,
            a = o < n.length - 1 ? n[o + 1] : null;
        s && a && Go(a) ? (r.push(new vt(s, jf(a))), o += 2) : (r.push(new vt(s, {})), o++)
    }
    return new k(r, {})
}

function ow(e) {
    let t = {};
    return Object.entries(e).forEach(([n, r]) => {
        typeof r == "string" && (r = [r]), r !== null && (t[n] = Wa(new k([], {}), 0, r))
    }), t
}

function jf(e) {
    let t = {};
    return Object.entries(e).forEach(([n, r]) => t[n] = `${r}`), t
}

function Vf(e, t, n) {
    return e == n.path && _e(t, n.parameters)
}
var qo = "imperative",
    Y = function(e) {
        return e[e.NavigationStart = 0] = "NavigationStart", e[e.NavigationEnd = 1] = "NavigationEnd", e[e.NavigationCancel = 2] = "NavigationCancel", e[e.NavigationError = 3] = "NavigationError", e[e.RoutesRecognized = 4] = "RoutesRecognized", e[e.ResolveStart = 5] = "ResolveStart", e[e.ResolveEnd = 6] = "ResolveEnd", e[e.GuardsCheckStart = 7] = "GuardsCheckStart", e[e.GuardsCheckEnd = 8] = "GuardsCheckEnd", e[e.RouteConfigLoadStart = 9] = "RouteConfigLoadStart", e[e.RouteConfigLoadEnd = 10] = "RouteConfigLoadEnd", e[e.ChildActivationStart = 11] = "ChildActivationStart", e[e.ChildActivationEnd = 12] = "ChildActivationEnd", e[e.ActivationStart = 13] = "ActivationStart", e[e.ActivationEnd = 14] = "ActivationEnd", e[e.Scroll = 15] = "Scroll", e[e.NavigationSkipped = 16] = "NavigationSkipped", e
    }(Y || {}),
    pe = class {
        id;
        url;
        constructor(t, n) {
            this.id = t, this.url = n
        }
    },
    on = class extends pe {
        type = Y.NavigationStart;
        navigationTrigger;
        restoredState;
        constructor(t, n, r = "imperative", o = null) {
            super(t, n), this.navigationTrigger = r, this.restoredState = o
        }
        toString() {
            return `NavigationStart(id: ${this.id}, url: '${this.url}')`
        }
    },
    Xe = class extends pe {
        urlAfterRedirects;
        type = Y.NavigationEnd;
        constructor(t, n, r) {
            super(t, n), this.urlAfterRedirects = r
        }
        toString() {
            return `NavigationEnd(id: ${this.id}, url: '${this.url}', urlAfterRedirects: '${this.urlAfterRedirects}')`
        }
    },
    ce = function(e) {
        return e[e.Redirect = 0] = "Redirect", e[e.SupersededByNewNavigation = 1] = "SupersededByNewNavigation", e[e.NoDataFromResolver = 2] = "NoDataFromResolver", e[e.GuardRejected = 3] = "GuardRejected", e
    }(ce || {}),
    Zo = function(e) {
        return e[e.IgnoredSameUrlNavigation = 0] = "IgnoredSameUrlNavigation", e[e.IgnoredByUrlHandlingStrategy = 1] = "IgnoredByUrlHandlingStrategy", e
    }(Zo || {}),
    Ue = class extends pe {
        reason;
        code;
        type = Y.NavigationCancel;
        constructor(t, n, r, o) {
            super(t, n), this.reason = r, this.code = o
        }
        toString() {
            return `NavigationCancel(id: ${this.id}, url: '${this.url}')`
        }
    },
    et = class extends pe {
        reason;
        code;
        type = Y.NavigationSkipped;
        constructor(t, n, r, o) {
            super(t, n), this.reason = r, this.code = o
        }
    },
    Kn = class extends pe {
        error;
        target;
        type = Y.NavigationError;
        constructor(t, n, r, o) {
            super(t, n), this.error = r, this.target = o
        }
        toString() {
            return `NavigationError(id: ${this.id}, url: '${this.url}', error: ${this.error})`
        }
    },
    Qo = class extends pe {
        urlAfterRedirects;
        state;
        type = Y.RoutesRecognized;
        constructor(t, n, r, o) {
            super(t, n), this.urlAfterRedirects = r, this.state = o
        }
        toString() {
            return `RoutesRecognized(id: ${this.id}, url: '${this.url}', urlAfterRedirects: '${this.urlAfterRedirects}', state: ${this.state})`
        }
    },
    Za = class extends pe {
        urlAfterRedirects;
        state;
        type = Y.GuardsCheckStart;
        constructor(t, n, r, o) {
            super(t, n), this.urlAfterRedirects = r, this.state = o
        }
        toString() {
            return `GuardsCheckStart(id: ${this.id}, url: '${this.url}', urlAfterRedirects: '${this.urlAfterRedirects}', state: ${this.state})`
        }
    },
    Qa = class extends pe {
        urlAfterRedirects;
        state;
        shouldActivate;
        type = Y.GuardsCheckEnd;
        constructor(t, n, r, o, i) {
            super(t, n), this.urlAfterRedirects = r, this.state = o, this.shouldActivate = i
        }
        toString() {
            return `GuardsCheckEnd(id: ${this.id}, url: '${this.url}', urlAfterRedirects: '${this.urlAfterRedirects}', state: ${this.state}, shouldActivate: ${this.shouldActivate})`
        }
    },
    Ya = class extends pe {
        urlAfterRedirects;
        state;
        type = Y.ResolveStart;
        constructor(t, n, r, o) {
            super(t, n), this.urlAfterRedirects = r, this.state = o
        }
        toString() {
            return `ResolveStart(id: ${this.id}, url: '${this.url}', urlAfterRedirects: '${this.urlAfterRedirects}', state: ${this.state})`
        }
    },
    Ka = class extends pe {
        urlAfterRedirects;
        state;
        type = Y.ResolveEnd;
        constructor(t, n, r, o) {
            super(t, n), this.urlAfterRedirects = r, this.state = o
        }
        toString() {
            return `ResolveEnd(id: ${this.id}, url: '${this.url}', urlAfterRedirects: '${this.urlAfterRedirects}', state: ${this.state})`
        }
    },
    Ja = class {
        route;
        type = Y.RouteConfigLoadStart;
        constructor(t) {
            this.route = t
        }
        toString() {
            return `RouteConfigLoadStart(path: ${this.route.path})`
        }
    },
    Xa = class {
        route;
        type = Y.RouteConfigLoadEnd;
        constructor(t) {
            this.route = t
        }
        toString() {
            return `RouteConfigLoadEnd(path: ${this.route.path})`
        }
    },
    ec = class {
        snapshot;
        type = Y.ChildActivationStart;
        constructor(t) {
            this.snapshot = t
        }
        toString() {
            return `ChildActivationStart(path: '${this.snapshot.routeConfig&&this.snapshot.routeConfig.path||""}')`
        }
    },
    tc = class {
        snapshot;
        type = Y.ChildActivationEnd;
        constructor(t) {
            this.snapshot = t
        }
        toString() {
            return `ChildActivationEnd(path: '${this.snapshot.routeConfig&&this.snapshot.routeConfig.path||""}')`
        }
    },
    nc = class {
        snapshot;
        type = Y.ActivationStart;
        constructor(t) {
            this.snapshot = t
        }
        toString() {
            return `ActivationStart(path: '${this.snapshot.routeConfig&&this.snapshot.routeConfig.path||""}')`
        }
    },
    rc = class {
        snapshot;
        type = Y.ActivationEnd;
        constructor(t) {
            this.snapshot = t
        }
        toString() {
            return `ActivationEnd(path: '${this.snapshot.routeConfig&&this.snapshot.routeConfig.path||""}')`
        }
    };
var Jn = class {},
    sn = class {
        url;
        navigationBehaviorOptions;
        constructor(t, n) {
            this.url = t, this.navigationBehaviorOptions = n
        }
    };

function iw(e, t) {
    return e.providers && !e._injector && (e._injector = No(e.providers, t, `Route: ${e.path}`)), e._injector ?? t
}

function Ie(e) {
    return e.outlet || S
}

function sw(e, t) {
    let n = e.filter(r => Ie(r) === t);
    return n.push(...e.filter(r => Ie(r) !== t)), n
}

function or(e) {
    if (!e) return null;
    if (e.routeConfig?._injector) return e.routeConfig._injector;
    for (let t = e.parent; t; t = t.parent) {
        let n = t.routeConfig;
        if (n?._loadedInjector) return n._loadedInjector;
        if (n?._injector) return n._injector
    }
    return null
}
var oc = class {
        rootInjector;
        outlet = null;
        route = null;
        children;
        attachRef = null;
        get injector() {
            return or(this.route?.snapshot) ?? this.rootInjector
        }
        constructor(t) {
            this.rootInjector = t, this.children = new ir(this.rootInjector)
        }
    },
    ir = (() => {
        class e {
            rootInjector;
            contexts = new Map;
            constructor(n) {
                this.rootInjector = n
            }
            onChildOutletCreated(n, r) {
                let o = this.getOrCreateContext(n);
                o.outlet = r, this.contexts.set(n, o)
            }
            onChildOutletDestroyed(n) {
                let r = this.getContext(n);
                r && (r.outlet = null, r.attachRef = null)
            }
            onOutletDeactivated() {
                let n = this.contexts;
                return this.contexts = new Map, n
            }
            onOutletReAttached(n) {
                this.contexts = n
            }
            getOrCreateContext(n) {
                let r = this.getContext(n);
                return r || (r = new oc(this.rootInjector), this.contexts.set(n, r)), r
            }
            getContext(n) {
                return this.contexts.get(n) || null
            }
            static \u0275fac = function(r) {
                return new(r || e)(_(fe))
            };
            static \u0275prov = w({
                token: e,
                factory: e.\u0275fac,
                providedIn: "root"
            })
        }
        return e
    })(),
    Yo = class {
        _root;
        constructor(t) {
            this._root = t
        }
        get root() {
            return this._root.value
        }
        parent(t) {
            let n = this.pathFromRoot(t);
            return n.length > 1 ? n[n.length - 2] : null
        }
        children(t) {
            let n = ic(t, this._root);
            return n ? n.children.map(r => r.value) : []
        }
        firstChild(t) {
            let n = ic(t, this._root);
            return n && n.children.length > 0 ? n.children[0].value : null
        }
        siblings(t) {
            let n = sc(t, this._root);
            return n.length < 2 ? [] : n[n.length - 2].children.map(o => o.value).filter(o => o !== t)
        }
        pathFromRoot(t) {
            return sc(t, this._root).map(n => n.value)
        }
    };

function ic(e, t) {
    if (e === t.value) return t;
    for (let n of t.children) {
        let r = ic(e, n);
        if (r) return r
    }
    return null
}

function sc(e, t) {
    if (e === t.value) return [t];
    for (let n of t.children) {
        let r = sc(e, n);
        if (r.length) return r.unshift(t), r
    }
    return []
}
var ae = class {
    value;
    children;
    constructor(t, n) {
        this.value = t, this.children = n
    }
    toString() {
        return `TreeNode(${this.value})`
    }
};

function Kt(e) {
    let t = {};
    return e && e.children.forEach(n => t[n.value.outlet] = n), t
}
var Ko = class extends Yo {
    snapshot;
    constructor(t, n) {
        super(t), this.snapshot = n, gc(this, t)
    }
    toString() {
        return this.snapshot.toString()
    }
};

function rp(e) {
    let t = aw(e),
        n = new Z([new vt("", {})]),
        r = new Z({}),
        o = new Z({}),
        i = new Z({}),
        s = new Z(""),
        a = new Dt(n, r, i, s, o, S, e, t.root);
    return a.snapshot = t.root, new Ko(new ae(a, []), t)
}

function aw(e) {
    let t = {},
        n = {},
        r = {},
        o = "",
        i = new Xt([], t, r, o, n, S, e, null, {});
    return new Xo("", new ae(i, []))
}
var Dt = class {
    urlSubject;
    paramsSubject;
    queryParamsSubject;
    fragmentSubject;
    dataSubject;
    outlet;
    component;
    snapshot;
    _futureSnapshot;
    _routerState;
    _paramMap;
    _queryParamMap;
    title;
    url;
    params;
    queryParams;
    fragment;
    data;
    constructor(t, n, r, o, i, s, a, c) {
        this.urlSubject = t, this.paramsSubject = n, this.queryParamsSubject = r, this.fragmentSubject = o, this.dataSubject = i, this.outlet = s, this.component = a, this._futureSnapshot = c, this.title = this.dataSubject?.pipe(R(u => u[rr])) ?? C(void 0), this.url = t, this.params = n, this.queryParams = r, this.fragment = o, this.data = i
    }
    get routeConfig() {
        return this._futureSnapshot.routeConfig
    }
    get root() {
        return this._routerState.root
    }
    get parent() {
        return this._routerState.parent(this)
    }
    get firstChild() {
        return this._routerState.firstChild(this)
    }
    get children() {
        return this._routerState.children(this)
    }
    get pathFromRoot() {
        return this._routerState.pathFromRoot(this)
    }
    get paramMap() {
        return this._paramMap ??= this.params.pipe(R(t => tn(t))), this._paramMap
    }
    get queryParamMap() {
        return this._queryParamMap ??= this.queryParams.pipe(R(t => tn(t))), this._queryParamMap
    }
    toString() {
        return this.snapshot ? this.snapshot.toString() : `Future(${this._futureSnapshot})`
    }
};

function Jo(e, t, n = "emptyOnly") {
    let r, {
        routeConfig: o
    } = e;
    return t !== null && (n === "always" || o?.path === "" || !t.component && !t.routeConfig?.loadComponent) ? r = {
        params: m(m({}, t.params), e.params),
        data: m(m({}, t.data), e.data),
        resolve: m(m(m(m({}, e.data), t.data), o?.data), e._resolvedData)
    } : r = {
        params: m({}, e.params),
        data: m({}, e.data),
        resolve: m(m({}, e.data), e._resolvedData ?? {})
    }, o && ip(o) && (r.resolve[rr] = o.title), r
}
var Xt = class {
        url;
        params;
        queryParams;
        fragment;
        data;
        outlet;
        component;
        routeConfig;
        _resolve;
        _resolvedData;
        _routerState;
        _paramMap;
        _queryParamMap;
        get title() {
            return this.data?.[rr]
        }
        constructor(t, n, r, o, i, s, a, c, u) {
            this.url = t, this.params = n, this.queryParams = r, this.fragment = o, this.data = i, this.outlet = s, this.component = a, this.routeConfig = c, this._resolve = u
        }
        get root() {
            return this._routerState.root
        }
        get parent() {
            return this._routerState.parent(this)
        }
        get firstChild() {
            return this._routerState.firstChild(this)
        }
        get children() {
            return this._routerState.children(this)
        }
        get pathFromRoot() {
            return this._routerState.pathFromRoot(this)
        }
        get paramMap() {
            return this._paramMap ??= tn(this.params), this._paramMap
        }
        get queryParamMap() {
            return this._queryParamMap ??= tn(this.queryParams), this._queryParamMap
        }
        toString() {
            let t = this.url.map(r => r.toString()).join("/"),
                n = this.routeConfig ? this.routeConfig.path : "";
            return `Route(url:'${t}', path:'${n}')`
        }
    },
    Xo = class extends Yo {
        url;
        constructor(t, n) {
            super(n), this.url = t, gc(this, n)
        }
        toString() {
            return op(this._root)
        }
    };

function gc(e, t) {
    t.value._routerState = e, t.children.forEach(n => gc(e, n))
}

function op(e) {
    let t = e.children.length > 0 ? ` { ${e.children.map(op).join(", ")} } ` : "";
    return `${e.value}${t}`
}

function $a(e) {
    if (e.snapshot) {
        let t = e.snapshot,
            n = e._futureSnapshot;
        e.snapshot = n, _e(t.queryParams, n.queryParams) || e.queryParamsSubject.next(n.queryParams), t.fragment !== n.fragment && e.fragmentSubject.next(n.fragment), _e(t.params, n.params) || e.paramsSubject.next(n.params), kD(t.url, n.url) || e.urlSubject.next(n.url), _e(t.data, n.data) || e.dataSubject.next(n.data)
    } else e.snapshot = e._futureSnapshot, e.dataSubject.next(e._futureSnapshot.data)
}

function ac(e, t) {
    let n = _e(e.params, t.params) && jD(e.url, t.url),
        r = !e.parent != !t.parent;
    return n && !r && (!e.parent || ac(e.parent, t.parent))
}

function ip(e) {
    return typeof e.title == "string" || e.title === null
}
var cw = new D(""),
    sp = (() => {
        class e {
            activated = null;
            get activatedComponentRef() {
                return this.activated
            }
            _activatedRoute = null;
            name = S;
            activateEvents = new re;
            deactivateEvents = new re;
            attachEvents = new re;
            detachEvents = new re;
            routerOutletData = rd(void 0);
            parentContexts = g(ir);
            location = g(Zt);
            changeDetector = g(Ma);
            inputBinder = g(ri, {
                optional: !0
            });
            supportsBindingToComponentInputs = !0;
            ngOnChanges(n) {
                if (n.name) {
                    let {
                        firstChange: r,
                        previousValue: o
                    } = n.name;
                    if (r) return;
                    this.isTrackedInParentContexts(o) && (this.deactivate(), this.parentContexts.onChildOutletDestroyed(o)), this.initializeOutletWithName()
                }
            }
            ngOnDestroy() {
                this.isTrackedInParentContexts(this.name) && this.parentContexts.onChildOutletDestroyed(this.name), this.inputBinder?.unsubscribeFromRouteData(this)
            }
            isTrackedInParentContexts(n) {
                return this.parentContexts.getContext(n)?.outlet === this
            }
            ngOnInit() {
                this.initializeOutletWithName()
            }
            initializeOutletWithName() {
                if (this.parentContexts.onChildOutletCreated(this.name, this), this.activated) return;
                let n = this.parentContexts.getContext(this.name);
                n?.route && (n.attachRef ? this.attach(n.attachRef, n.route) : this.activateWith(n.route, n.injector))
            }
            get isActivated() {
                return !!this.activated
            }
            get component() {
                if (!this.activated) throw new v(4012, !1);
                return this.activated.instance
            }
            get activatedRoute() {
                if (!this.activated) throw new v(4012, !1);
                return this._activatedRoute
            }
            get activatedRouteData() {
                return this._activatedRoute ? this._activatedRoute.snapshot.data : {}
            }
            detach() {
                if (!this.activated) throw new v(4012, !1);
                this.location.detach();
                let n = this.activated;
                return this.activated = null, this._activatedRoute = null, this.detachEvents.emit(n.instance), n
            }
            attach(n, r) {
                this.activated = n, this._activatedRoute = r, this.location.insert(n.hostView), this.inputBinder?.bindActivatedRouteToOutletComponent(this), this.attachEvents.emit(n.instance)
            }
            deactivate() {
                if (this.activated) {
                    let n = this.component;
                    this.activated.destroy(), this.activated = null, this._activatedRoute = null, this.deactivateEvents.emit(n)
                }
            }
            activateWith(n, r) {
                if (this.isActivated) throw new v(4013, !1);
                this._activatedRoute = n;
                let o = this.location,
                    s = n.snapshot.component,
                    a = this.parentContexts.getOrCreateContext(this.name).children,
                    c = new cc(n, a, o.injector, this.routerOutletData);
                this.activated = o.createComponent(s, {
                    index: o.length,
                    injector: c,
                    environmentInjector: r
                }), this.changeDetector.markForCheck(), this.inputBinder?.bindActivatedRouteToOutletComponent(this), this.activateEvents.emit(this.activated.instance)
            }
            static \u0275fac = function(r) {
                return new(r || e)
            };
            static \u0275dir = wa({
                type: e,
                selectors: [
                    ["router-outlet"]
                ],
                inputs: {
                    name: "name",
                    routerOutletData: [1, "routerOutletData"]
                },
                outputs: {
                    activateEvents: "activate",
                    deactivateEvents: "deactivate",
                    attachEvents: "attach",
                    detachEvents: "detach"
                },
                exportAs: ["outlet"],
                features: [Hs]
            })
        }
        return e
    })(),
    cc = class {
        route;
        childContexts;
        parent;
        outletData;
        constructor(t, n, r, o) {
            this.route = t, this.childContexts = n, this.parent = r, this.outletData = o
        }
        get(t, n) {
            return t === Dt ? this.route : t === ir ? this.childContexts : t === cw ? this.outletData : this.parent.get(t, n)
        }
    },
    ri = new D("");

function uw(e, t, n) {
    let r = Xn(e, t._root, n ? n._root : void 0);
    return new Ko(r, t)
}

function Xn(e, t, n) {
    if (n && e.shouldReuseRoute(t.value, n.value.snapshot)) {
        let r = n.value;
        r._futureSnapshot = t.value;
        let o = lw(e, t, n);
        return new ae(r, o)
    } else {
        if (e.shouldAttach(t.value)) {
            let i = e.retrieve(t.value);
            if (i !== null) {
                let s = i.route;
                return s.value._futureSnapshot = t.value, s.children = t.children.map(a => Xn(e, a)), s
            }
        }
        let r = dw(t.value),
            o = t.children.map(i => Xn(e, i));
        return new ae(r, o)
    }
}

function lw(e, t, n) {
    return t.children.map(r => {
        for (let o of n.children)
            if (e.shouldReuseRoute(r.value, o.value.snapshot)) return Xn(e, r, o);
        return Xn(e, r)
    })
}

function dw(e) {
    return new Dt(new Z(e.url), new Z(e.params), new Z(e.queryParams), new Z(e.fragment), new Z(e.data), e.outlet, e.component, e)
}
var er = class {
        redirectTo;
        navigationBehaviorOptions;
        constructor(t, n) {
            this.redirectTo = t, this.navigationBehaviorOptions = n
        }
    },
    ap = "ngNavigationCancelingError";

function ei(e, t) {
    let {
        redirectTo: n,
        navigationBehaviorOptions: r
    } = rn(t) ? {
        redirectTo: t,
        navigationBehaviorOptions: void 0
    } : t, o = cp(!1, ce.Redirect);
    return o.url = n, o.navigationBehaviorOptions = r, o
}

function cp(e, t) {
    let n = new Error(`NavigationCancelingError: ${e||""}`);
    return n[ap] = !0, n.cancellationCode = t, n
}

function fw(e) {
    return up(e) && rn(e.url)
}

function up(e) {
    return !!e && e[ap]
}
var pw = (e, t, n, r) => R(o => (new uc(t, o.targetRouterState, o.currentRouterState, n, r).activate(e), o)),
    uc = class {
        routeReuseStrategy;
        futureState;
        currState;
        forwardEvent;
        inputBindingEnabled;
        constructor(t, n, r, o, i) {
            this.routeReuseStrategy = t, this.futureState = n, this.currState = r, this.forwardEvent = o, this.inputBindingEnabled = i
        }
        activate(t) {
            let n = this.futureState._root,
                r = this.currState ? this.currState._root : null;
            this.deactivateChildRoutes(n, r, t), $a(this.futureState.root), this.activateChildRoutes(n, r, t)
        }
        deactivateChildRoutes(t, n, r) {
            let o = Kt(n);
            t.children.forEach(i => {
                let s = i.value.outlet;
                this.deactivateRoutes(i, o[s], r), delete o[s]
            }), Object.values(o).forEach(i => {
                this.deactivateRouteAndItsChildren(i, r)
            })
        }
        deactivateRoutes(t, n, r) {
            let o = t.value,
                i = n ? n.value : null;
            if (o === i)
                if (o.component) {
                    let s = r.getContext(o.outlet);
                    s && this.deactivateChildRoutes(t, n, s.children)
                } else this.deactivateChildRoutes(t, n, r);
            else i && this.deactivateRouteAndItsChildren(n, r)
        }
        deactivateRouteAndItsChildren(t, n) {
            t.value.component && this.routeReuseStrategy.shouldDetach(t.value.snapshot) ? this.detachAndStoreRouteSubtree(t, n) : this.deactivateRouteAndOutlet(t, n)
        }
        detachAndStoreRouteSubtree(t, n) {
            let r = n.getContext(t.value.outlet),
                o = r && t.value.component ? r.children : n,
                i = Kt(t);
            for (let s of Object.values(i)) this.deactivateRouteAndItsChildren(s, o);
            if (r && r.outlet) {
                let s = r.outlet.detach(),
                    a = r.children.onOutletDeactivated();
                this.routeReuseStrategy.store(t.value.snapshot, {
                    componentRef: s,
                    route: t,
                    contexts: a
                })
            }
        }
        deactivateRouteAndOutlet(t, n) {
            let r = n.getContext(t.value.outlet),
                o = r && t.value.component ? r.children : n,
                i = Kt(t);
            for (let s of Object.values(i)) this.deactivateRouteAndItsChildren(s, o);
            r && (r.outlet && (r.outlet.deactivate(), r.children.onOutletDeactivated()), r.attachRef = null, r.route = null)
        }
        activateChildRoutes(t, n, r) {
            let o = Kt(n);
            t.children.forEach(i => {
                this.activateRoutes(i, o[i.value.outlet], r), this.forwardEvent(new rc(i.value.snapshot))
            }), t.children.length && this.forwardEvent(new tc(t.value.snapshot))
        }
        activateRoutes(t, n, r) {
            let o = t.value,
                i = n ? n.value : null;
            if ($a(o), o === i)
                if (o.component) {
                    let s = r.getOrCreateContext(o.outlet);
                    this.activateChildRoutes(t, n, s.children)
                } else this.activateChildRoutes(t, n, r);
            else if (o.component) {
                let s = r.getOrCreateContext(o.outlet);
                if (this.routeReuseStrategy.shouldAttach(o.snapshot)) {
                    let a = this.routeReuseStrategy.retrieve(o.snapshot);
                    this.routeReuseStrategy.store(o.snapshot, null), s.children.onOutletReAttached(a.contexts), s.attachRef = a.componentRef, s.route = a.route.value, s.outlet && s.outlet.attach(a.componentRef, a.route.value), $a(a.route.value), this.activateChildRoutes(t, null, s.children)
                } else s.attachRef = null, s.route = o, s.outlet && s.outlet.activateWith(o, s.injector), this.activateChildRoutes(t, null, s.children)
            } else this.activateChildRoutes(t, null, r)
        }
    },
    ti = class {
        path;
        route;
        constructor(t) {
            this.path = t, this.route = this.path[this.path.length - 1]
        }
    },
    en = class {
        component;
        route;
        constructor(t, n) {
            this.component = t, this.route = n
        }
    };

function hw(e, t, n) {
    let r = e._root,
        o = t ? t._root : null;
    return Wn(r, o, n, [r.value])
}

function gw(e) {
    let t = e.routeConfig ? e.routeConfig.canActivateChild : null;
    return !t || t.length === 0 ? null : {
        node: e,
        guards: t
    }
}

function cn(e, t) {
    let n = Symbol(),
        r = t.get(e, n);
    return r === n ? typeof e == "function" && !el(e) ? e : t.get(e) : r
}

function Wn(e, t, n, r, o = {
    canDeactivateChecks: [],
    canActivateChecks: []
}) {
    let i = Kt(t);
    return e.children.forEach(s => {
        mw(s, i[s.value.outlet], n, r.concat([s.value]), o), delete i[s.value.outlet]
    }), Object.entries(i).forEach(([s, a]) => Qn(a, n.getContext(s), o)), o
}

function mw(e, t, n, r, o = {
    canDeactivateChecks: [],
    canActivateChecks: []
}) {
    let i = e.value,
        s = t ? t.value : null,
        a = n ? n.getContext(e.value.outlet) : null;
    if (s && i.routeConfig === s.routeConfig) {
        let c = vw(s, i, i.routeConfig.runGuardsAndResolvers);
        c ? o.canActivateChecks.push(new ti(r)) : (i.data = s.data, i._resolvedData = s._resolvedData), i.component ? Wn(e, t, a ? a.children : null, r, o) : Wn(e, t, n, r, o), c && a && a.outlet && a.outlet.isActivated && o.canDeactivateChecks.push(new en(a.outlet.component, s))
    } else s && Qn(t, a, o), o.canActivateChecks.push(new ti(r)), i.component ? Wn(e, null, a ? a.children : null, r, o) : Wn(e, null, n, r, o);
    return o
}

function vw(e, t, n) {
    if (typeof n == "function") return n(e, t);
    switch (n) {
        case "pathParamsChange":
            return !yt(e.url, t.url);
        case "pathParamsOrQueryParamsChange":
            return !yt(e.url, t.url) || !_e(e.queryParams, t.queryParams);
        case "always":
            return !0;
        case "paramsOrQueryParamsChange":
            return !ac(e, t) || !_e(e.queryParams, t.queryParams);
        case "paramsChange":
        default:
            return !ac(e, t)
    }
}

function Qn(e, t, n) {
    let r = Kt(e),
        o = e.value;
    Object.entries(r).forEach(([i, s]) => {
        o.component ? t ? Qn(s, t.children.getContext(i), n) : Qn(s, null, n) : Qn(s, t, n)
    }), o.component ? t && t.outlet && t.outlet.isActivated ? n.canDeactivateChecks.push(new en(t.outlet.component, o)) : n.canDeactivateChecks.push(new en(null, o)) : n.canDeactivateChecks.push(new en(null, o))
}

function sr(e) {
    return typeof e == "function"
}

function yw(e) {
    return typeof e == "boolean"
}

function Dw(e) {
    return e && sr(e.canLoad)
}

function ww(e) {
    return e && sr(e.canActivate)
}

function Ew(e) {
    return e && sr(e.canActivateChild)
}

function Cw(e) {
    return e && sr(e.canDeactivate)
}

function Iw(e) {
    return e && sr(e.canMatch)
}

function lp(e) {
    return e instanceof Ne || e?.name === "EmptyError"
}
var $o = Symbol("INITIAL_VALUE");

function an() {
    return me(e => Nr(e.map(t => t.pipe(xe(1), Ai($o)))).pipe(R(t => {
        for (let n of t)
            if (n !== !0) {
                if (n === $o) return $o;
                if (n === !1 || bw(n)) return n
            } return !0
    }), ge(t => t !== $o), xe(1)))
}

function bw(e) {
    return rn(e) || e instanceof er
}

function Sw(e, t) {
    return z(n => {
        let {
            targetSnapshot: r,
            currentSnapshot: o,
            guards: {
                canActivateChecks: i,
                canDeactivateChecks: s
            }
        } = n;
        return s.length === 0 && i.length === 0 ? C(O(m({}, n), {
            guardsResult: !0
        })) : Mw(s, r, o, e).pipe(z(a => a && yw(a) ? _w(r, i, e, t) : C(a)), R(a => O(m({}, n), {
            guardsResult: a
        })))
    })
}

function Mw(e, t, n, r) {
    return H(e).pipe(z(o => Aw(o.component, o.route, n, t, r)), Re(o => o !== !0, !0))
}

function _w(e, t, n, r) {
    return H(t).pipe(Rt(o => xt(Nw(o.route.parent, r), Tw(o.route, r), Rw(e, o.path, n), xw(e, o.route, n))), Re(o => o !== !0, !0))
}

function Tw(e, t) {
    return e !== null && t && t(new nc(e)), C(!0)
}

function Nw(e, t) {
    return e !== null && t && t(new ec(e)), C(!0)
}

function xw(e, t, n) {
    let r = t.routeConfig ? t.routeConfig.canActivate : null;
    if (!r || r.length === 0) return C(!0);
    let o = r.map(i => xr(() => {
        let s = or(t) ?? n,
            a = cn(i, s),
            c = ww(a) ? a.canActivate(t, e) : Ee(s, () => a(t, e));
        return tt(c).pipe(Re())
    }));
    return C(o).pipe(an())
}

function Rw(e, t, n) {
    let r = t[t.length - 1],
        i = t.slice(0, t.length - 1).reverse().map(s => gw(s)).filter(s => s !== null).map(s => xr(() => {
            let a = s.guards.map(c => {
                let u = or(s.node) ?? n,
                    l = cn(c, u),
                    f = Ew(l) ? l.canActivateChild(r, e) : Ee(u, () => l(r, e));
                return tt(f).pipe(Re())
            });
            return C(a).pipe(an())
        }));
    return C(i).pipe(an())
}

function Aw(e, t, n, r, o) {
    let i = t && t.routeConfig ? t.routeConfig.canDeactivate : null;
    if (!i || i.length === 0) return C(!0);
    let s = i.map(a => {
        let c = or(t) ?? o,
            u = cn(a, c),
            l = Cw(u) ? u.canDeactivate(e, t, n, r) : Ee(c, () => u(e, t, n, r));
        return tt(l).pipe(Re())
    });
    return C(s).pipe(an())
}

function Ow(e, t, n, r) {
    let o = t.canLoad;
    if (o === void 0 || o.length === 0) return C(!0);
    let i = o.map(s => {
        let a = cn(s, e),
            c = Dw(a) ? a.canLoad(t, n) : Ee(e, () => a(t, n));
        return tt(c)
    });
    return C(i).pipe(an(), dp(r))
}

function dp(e) {
    return Si(Q(t => {
        if (typeof t != "boolean") throw ei(e, t)
    }), R(t => t === !0))
}

function kw(e, t, n, r) {
    let o = t.canMatch;
    if (!o || o.length === 0) return C(!0);
    let i = o.map(s => {
        let a = cn(s, e),
            c = Iw(a) ? a.canMatch(t, n) : Ee(e, () => a(t, n));
        return tt(c)
    });
    return C(i).pipe(an(), dp(r))
}
var tr = class {
        segmentGroup;
        constructor(t) {
            this.segmentGroup = t || null
        }
    },
    nr = class extends Error {
        urlTree;
        constructor(t) {
            super(), this.urlTree = t
        }
    };

function Yt(e) {
    return Nt(new tr(e))
}

function Pw(e) {
    return Nt(new v(4e3, !1))
}

function Fw(e) {
    return Nt(cp(!1, ce.GuardRejected))
}
var lc = class {
        urlSerializer;
        urlTree;
        constructor(t, n) {
            this.urlSerializer = t, this.urlTree = n
        }
        lineralizeSegments(t, n) {
            let r = [],
                o = n.root;
            for (;;) {
                if (r = r.concat(o.segments), o.numberOfChildren === 0) return C(r);
                if (o.numberOfChildren > 1 || !o.children[S]) return Pw(`${t.redirectTo}`);
                o = o.children[S]
            }
        }
        applyRedirectCommands(t, n, r, o, i) {
            if (typeof n != "string") {
                let a = n,
                    {
                        queryParams: c,
                        fragment: u,
                        routeConfig: l,
                        url: f,
                        outlet: p,
                        params: d,
                        data: h,
                        title: y
                    } = o,
                    P = Ee(i, () => a({
                        params: d,
                        data: h,
                        queryParams: c,
                        fragment: u,
                        routeConfig: l,
                        url: f,
                        outlet: p,
                        title: y
                    }));
                if (P instanceof ze) throw new nr(P);
                n = P
            }
            let s = this.applyRedirectCreateUrlTree(n, this.urlSerializer.parse(n), t, r);
            if (n[0] === "/") throw new nr(s);
            return s
        }
        applyRedirectCreateUrlTree(t, n, r, o) {
            let i = this.createSegmentGroup(t, n.root, r, o);
            return new ze(i, this.createQueryParams(n.queryParams, this.urlTree.queryParams), n.fragment)
        }
        createQueryParams(t, n) {
            let r = {};
            return Object.entries(t).forEach(([o, i]) => {
                if (typeof i == "string" && i[0] === ":") {
                    let a = i.substring(1);
                    r[o] = n[a]
                } else r[o] = i
            }), r
        }
        createSegmentGroup(t, n, r, o) {
            let i = this.createSegments(t, n.segments, r, o),
                s = {};
            return Object.entries(n.children).forEach(([a, c]) => {
                s[a] = this.createSegmentGroup(t, c, r, o)
            }), new k(i, s)
        }
        createSegments(t, n, r, o) {
            return n.map(i => i.path[0] === ":" ? this.findPosParam(t, i, o) : this.findOrReturn(i, r))
        }
        findPosParam(t, n, r) {
            let o = r[n.path.substring(1)];
            if (!o) throw new v(4001, !1);
            return o
        }
        findOrReturn(t, n) {
            let r = 0;
            for (let o of n) {
                if (o.path === t.path) return n.splice(r), o;
                r++
            }
            return t
        }
    },
    dc = {
        matched: !1,
        consumedSegments: [],
        remainingSegments: [],
        parameters: {},
        positionalParamSegments: {}
    };

function Lw(e, t, n, r, o) {
    let i = fp(e, t, n);
    return i.matched ? (r = iw(t, r), kw(r, t, n, o).pipe(R(s => s === !0 ? i : m({}, dc)))) : C(i)
}

function fp(e, t, n) {
    if (t.path === "**") return jw(n);
    if (t.path === "") return t.pathMatch === "full" && (e.hasChildren() || n.length > 0) ? m({}, dc) : {
        matched: !0,
        consumedSegments: [],
        remainingSegments: n,
        parameters: {},
        positionalParamSegments: {}
    };
    let o = (t.matcher || OD)(n, e, t);
    if (!o) return m({}, dc);
    let i = {};
    Object.entries(o.posParams ?? {}).forEach(([a, c]) => {
        i[a] = c.path
    });
    let s = o.consumed.length > 0 ? m(m({}, i), o.consumed[o.consumed.length - 1].parameters) : i;
    return {
        matched: !0,
        consumedSegments: o.consumed,
        remainingSegments: n.slice(o.consumed.length),
        parameters: s,
        positionalParamSegments: o.posParams ?? {}
    }
}

function jw(e) {
    return {
        matched: !0,
        parameters: e.length > 0 ? zf(e).parameters : {},
        consumedSegments: e,
        remainingSegments: [],
        positionalParamSegments: {}
    }
}

function Bf(e, t, n, r) {
    return n.length > 0 && $w(e, n, r) ? {
        segmentGroup: new k(t, Bw(r, new k(n, e.children))),
        slicedSegments: []
    } : n.length === 0 && Hw(e, n, r) ? {
        segmentGroup: new k(e.segments, Vw(e, n, r, e.children)),
        slicedSegments: n
    } : {
        segmentGroup: new k(e.segments, e.children),
        slicedSegments: n
    }
}

function Vw(e, t, n, r) {
    let o = {};
    for (let i of n)
        if (oi(e, t, i) && !r[Ie(i)]) {
            let s = new k([], {});
            o[Ie(i)] = s
        } return m(m({}, r), o)
}

function Bw(e, t) {
    let n = {};
    n[S] = t;
    for (let r of e)
        if (r.path === "" && Ie(r) !== S) {
            let o = new k([], {});
            n[Ie(r)] = o
        } return n
}

function $w(e, t, n) {
    return n.some(r => oi(e, t, r) && Ie(r) !== S)
}

function Hw(e, t, n) {
    return n.some(r => oi(e, t, r))
}

function oi(e, t, n) {
    return (e.hasChildren() || t.length > 0) && n.pathMatch === "full" ? !1 : n.path === ""
}

function Uw(e, t, n) {
    return t.length === 0 && !e.children[n]
}
var fc = class {};

function zw(e, t, n, r, o, i, s = "emptyOnly") {
    return new pc(e, t, n, r, o, s, i).recognize()
}
var qw = 31,
    pc = class {
        injector;
        configLoader;
        rootComponentType;
        config;
        urlTree;
        paramsInheritanceStrategy;
        urlSerializer;
        applyRedirects;
        absoluteRedirectCount = 0;
        allowRedirects = !0;
        constructor(t, n, r, o, i, s, a) {
            this.injector = t, this.configLoader = n, this.rootComponentType = r, this.config = o, this.urlTree = i, this.paramsInheritanceStrategy = s, this.urlSerializer = a, this.applyRedirects = new lc(this.urlSerializer, this.urlTree)
        }
        noMatchError(t) {
            return new v(4002, `'${t.segmentGroup}'`)
        }
        recognize() {
            let t = Bf(this.urlTree.root, [], [], this.config).segmentGroup;
            return this.match(t).pipe(R(({
                children: n,
                rootSnapshot: r
            }) => {
                let o = new ae(r, n),
                    i = new Xo("", o),
                    s = JD(r, [], this.urlTree.queryParams, this.urlTree.fragment);
                return s.queryParams = this.urlTree.queryParams, i.url = this.urlSerializer.serialize(s), {
                    state: i,
                    tree: s
                }
            }))
        }
        match(t) {
            let n = new Xt([], Object.freeze({}), Object.freeze(m({}, this.urlTree.queryParams)), this.urlTree.fragment, Object.freeze({}), S, this.rootComponentType, null, {});
            return this.processSegmentGroup(this.injector, this.config, t, S, n).pipe(R(r => ({
                children: r,
                rootSnapshot: n
            })), We(r => {
                if (r instanceof nr) return this.urlTree = r.urlTree, this.match(r.urlTree.root);
                throw r instanceof tr ? this.noMatchError(r) : r
            }))
        }
        processSegmentGroup(t, n, r, o, i) {
            return r.segments.length === 0 && r.hasChildren() ? this.processChildren(t, n, r, i) : this.processSegment(t, n, r, r.segments, o, !0, i).pipe(R(s => s instanceof ae ? [s] : []))
        }
        processChildren(t, n, r, o) {
            let i = [];
            for (let s of Object.keys(r.children)) s === "primary" ? i.unshift(s) : i.push(s);
            return H(i).pipe(Rt(s => {
                let a = r.children[s],
                    c = sw(n, s);
                return this.processSegmentGroup(t, c, a, s, o)
            }), Ri((s, a) => (s.push(...a), s)), Ze(null), xi(), z(s => {
                if (s === null) return Yt(r);
                let a = pp(s);
                return Gw(a), C(a)
            }))
        }
        processSegment(t, n, r, o, i, s, a) {
            return H(n).pipe(Rt(c => this.processSegmentAgainstRoute(c._injector ?? t, n, c, r, o, i, s, a).pipe(We(u => {
                if (u instanceof tr) return C(null);
                throw u
            }))), Re(c => !!c), We(c => {
                if (lp(c)) return Uw(r, o, i) ? C(new fc) : Yt(r);
                throw c
            }))
        }
        processSegmentAgainstRoute(t, n, r, o, i, s, a, c) {
            return Ie(r) !== s && (s === S || !oi(o, i, r)) ? Yt(o) : r.redirectTo === void 0 ? this.matchSegmentAgainstRoute(t, o, r, i, s, c) : this.allowRedirects && a ? this.expandSegmentAgainstRouteUsingRedirect(t, o, n, r, i, s, c) : Yt(o)
        }
        expandSegmentAgainstRouteUsingRedirect(t, n, r, o, i, s, a) {
            let {
                matched: c,
                parameters: u,
                consumedSegments: l,
                positionalParamSegments: f,
                remainingSegments: p
            } = fp(n, o, i);
            if (!c) return Yt(n);
            typeof o.redirectTo == "string" && o.redirectTo[0] === "/" && (this.absoluteRedirectCount++, this.absoluteRedirectCount > qw && (this.allowRedirects = !1));
            let d = new Xt(i, u, Object.freeze(m({}, this.urlTree.queryParams)), this.urlTree.fragment, $f(o), Ie(o), o.component ?? o._loadedComponent ?? null, o, Hf(o)),
                h = Jo(d, a, this.paramsInheritanceStrategy);
            d.params = Object.freeze(h.params), d.data = Object.freeze(h.data);
            let y = this.applyRedirects.applyRedirectCommands(l, o.redirectTo, f, d, t);
            return this.applyRedirects.lineralizeSegments(o, y).pipe(z(P => this.processSegment(t, r, n, P.concat(p), s, !1, a)))
        }
        matchSegmentAgainstRoute(t, n, r, o, i, s) {
            let a = Lw(n, r, o, t, this.urlSerializer);
            return r.path === "**" && (n.children = {}), a.pipe(me(c => c.matched ? (t = r._injector ?? t, this.getChildConfig(t, r, o).pipe(me(({
                routes: u
            }) => {
                let l = r._loadedInjector ?? t,
                    {
                        parameters: f,
                        consumedSegments: p,
                        remainingSegments: d
                    } = c,
                    h = new Xt(p, f, Object.freeze(m({}, this.urlTree.queryParams)), this.urlTree.fragment, $f(r), Ie(r), r.component ?? r._loadedComponent ?? null, r, Hf(r)),
                    y = Jo(h, s, this.paramsInheritanceStrategy);
                h.params = Object.freeze(y.params), h.data = Object.freeze(y.data);
                let {
                    segmentGroup: P,
                    slicedSegments: j
                } = Bf(n, p, d, u);
                if (j.length === 0 && P.hasChildren()) return this.processChildren(l, u, P, h).pipe(R(wt => new ae(h, wt)));
                if (u.length === 0 && j.length === 0) return C(new ae(h, []));
                let qe = Ie(r) === i;
                return this.processSegment(l, u, P, j, qe ? S : i, !0, h).pipe(R(wt => new ae(h, wt instanceof ae ? [wt] : [])))
            }))) : Yt(n)))
        }
        getChildConfig(t, n, r) {
            return n.children ? C({
                routes: n.children,
                injector: t
            }) : n.loadChildren ? n._loadedRoutes !== void 0 ? C({
                routes: n._loadedRoutes,
                injector: n._loadedInjector
            }) : Ow(t, n, r, this.urlSerializer).pipe(z(o => o ? this.configLoader.loadChildren(t, n).pipe(Q(i => {
                n._loadedRoutes = i.routes, n._loadedInjector = i.injector
            })) : Fw(n))) : C({
                routes: [],
                injector: t
            })
        }
    };

function Gw(e) {
    e.sort((t, n) => t.value.outlet === S ? -1 : n.value.outlet === S ? 1 : t.value.outlet.localeCompare(n.value.outlet))
}

function Ww(e) {
    let t = e.value.routeConfig;
    return t && t.path === ""
}

function pp(e) {
    let t = [],
        n = new Set;
    for (let r of e) {
        if (!Ww(r)) {
            t.push(r);
            continue
        }
        let o = t.find(i => r.value.routeConfig === i.value.routeConfig);
        o !== void 0 ? (o.children.push(...r.children), n.add(o)) : t.push(r)
    }
    for (let r of n) {
        let o = pp(r.children);
        t.push(new ae(r.value, o))
    }
    return t.filter(r => !n.has(r))
}

function $f(e) {
    return e.data || {}
}

function Hf(e) {
    return e.resolve || {}
}

function Zw(e, t, n, r, o, i) {
    return z(s => zw(e, t, n, r, s.extractedUrl, o, i).pipe(R(({
        state: a,
        tree: c
    }) => O(m({}, s), {
        targetSnapshot: a,
        urlAfterRedirects: c
    }))))
}

function Qw(e, t) {
    return z(n => {
        let {
            targetSnapshot: r,
            guards: {
                canActivateChecks: o
            }
        } = n;
        if (!o.length) return C(n);
        let i = new Set(o.map(c => c.route)),
            s = new Set;
        for (let c of i)
            if (!s.has(c))
                for (let u of hp(c)) s.add(u);
        let a = 0;
        return H(s).pipe(Rt(c => i.has(c) ? Yw(c, r, e, t) : (c.data = Jo(c, c.parent, e).resolve, C(void 0))), Q(() => a++), At(1), z(c => a === s.size ? C(n) : te))
    })
}

function hp(e) {
    let t = e.children.map(n => hp(n)).flat();
    return [e, ...t]
}

function Yw(e, t, n, r) {
    let o = e.routeConfig,
        i = e._resolve;
    return o?.title !== void 0 && !ip(o) && (i[rr] = o.title), Kw(i, e, t, r).pipe(R(s => (e._resolvedData = s, e.data = Jo(e, e.parent, n).resolve, null)))
}

function Kw(e, t, n, r) {
    let o = za(e);
    if (o.length === 0) return C({});
    let i = {};
    return H(o).pipe(z(s => Jw(e[s], t, n, r).pipe(Re(), Q(a => {
        if (a instanceof er) throw ei(new nn, a);
        i[s] = a
    }))), At(1), R(() => i), We(s => lp(s) ? te : Nt(s)))
}

function Jw(e, t, n, r) {
    let o = or(t) ?? r,
        i = cn(e, o),
        s = i.resolve ? i.resolve(t, n) : Ee(o, () => i(t, n));
    return tt(s)
}

function Ha(e) {
    return me(t => {
        let n = e(t);
        return n ? H(n).pipe(R(() => t)) : C(t)
    })
}
var gp = (() => {
        class e {
            buildTitle(n) {
                let r, o = n.root;
                for (; o !== void 0;) r = this.getResolvedTitleForRoute(o) ?? r, o = o.children.find(i => i.outlet === S);
                return r
            }
            getResolvedTitleForRoute(n) {
                return n.data[rr]
            }
            static \u0275fac = function(r) {
                return new(r || e)
            };
            static \u0275prov = w({
                token: e,
                factory: () => g(Xw),
                providedIn: "root"
            })
        }
        return e
    })(),
    Xw = (() => {
        class e extends gp {
            title;
            constructor(n) {
                super(), this.title = n
            }
            updateTitle(n) {
                let r = this.buildTitle(n);
                r !== void 0 && this.title.setTitle(r)
            }
            static \u0275fac = function(r) {
                return new(r || e)(_(Pf))
            };
            static \u0275prov = w({
                token: e,
                factory: e.\u0275fac,
                providedIn: "root"
            })
        }
        return e
    })(),
    ii = new D("", {
        providedIn: "root",
        factory: () => ({})
    }),
    mp = (() => {
        class e {
            static \u0275fac = function(r) {
                return new(r || e)
            };
            static \u0275cmp = xo({
                type: e,
                selectors: [
                    ["ng-component"]
                ],
                exportAs: ["emptyRouterOutlet"],
                decls: 1,
                vars: 0,
                template: function(r, o) {
                    r & 1 && Vn(0, "router-outlet")
                },
                dependencies: [sp],
                encapsulation: 2
            })
        }
        return e
    })();

function mc(e) {
    let t = e.children && e.children.map(mc),
        n = t ? O(m({}, e), {
            children: t
        }) : m({}, e);
    return !n.component && !n.loadComponent && (t || n.loadChildren) && n.outlet && n.outlet !== S && (n.component = mp), n
}
var si = new D(""),
    vp = (() => {
        class e {
            componentLoaders = new WeakMap;
            childrenLoaders = new WeakMap;
            onLoadStartListener;
            onLoadEndListener;
            compiler = g(pf);
            loadComponent(n) {
                if (this.componentLoaders.get(n)) return this.componentLoaders.get(n);
                if (n._loadedComponent) return C(n._loadedComponent);
                this.onLoadStartListener && this.onLoadStartListener(n);
                let r = tt(n.loadComponent()).pipe(R(yp), Q(i => {
                        this.onLoadEndListener && this.onLoadEndListener(n), n._loadedComponent = i
                    }), pn(() => {
                        this.componentLoaders.delete(n)
                    })),
                    o = new Tt(r, () => new q).pipe(_t());
                return this.componentLoaders.set(n, o), o
            }
            loadChildren(n, r) {
                if (this.childrenLoaders.get(r)) return this.childrenLoaders.get(r);
                if (r._loadedRoutes) return C({
                    routes: r._loadedRoutes,
                    injector: r._loadedInjector
                });
                this.onLoadStartListener && this.onLoadStartListener(r);
                let i = eE(r, this.compiler, n, this.onLoadEndListener).pipe(pn(() => {
                        this.childrenLoaders.delete(r)
                    })),
                    s = new Tt(i, () => new q).pipe(_t());
                return this.childrenLoaders.set(r, s), s
            }
            static \u0275fac = function(r) {
                return new(r || e)
            };
            static \u0275prov = w({
                token: e,
                factory: e.\u0275fac,
                providedIn: "root"
            })
        }
        return e
    })();

function eE(e, t, n, r) {
    return tt(e.loadChildren()).pipe(R(yp), z(o => o instanceof Da || Array.isArray(o) ? C(o) : H(t.compileModuleAsync(o))), R(o => {
        r && r(e);
        let i, s, a = !1;
        return Array.isArray(o) ? (s = o, a = !0) : (i = o.create(n).injector, s = i.get(si, [], {
            optional: !0,
            self: !0
        }).flat()), {
            routes: s.map(mc),
            injector: i
        }
    }))
}

function tE(e) {
    return e && typeof e == "object" && "default" in e
}

function yp(e) {
    return tE(e) ? e.default : e
}
var vc = (() => {
        class e {
            static \u0275fac = function(r) {
                return new(r || e)
            };
            static \u0275prov = w({
                token: e,
                factory: () => g(nE),
                providedIn: "root"
            })
        }
        return e
    })(),
    nE = (() => {
        class e {
            shouldProcessUrl(n) {
                return !0
            }
            extract(n) {
                return n
            }
            merge(n, r) {
                return n
            }
            static \u0275fac = function(r) {
                return new(r || e)
            };
            static \u0275prov = w({
                token: e,
                factory: e.\u0275fac,
                providedIn: "root"
            })
        }
        return e
    })(),
    Dp = new D("");
var wp = new D(""),
    Ep = (() => {
        class e {
            currentNavigation = null;
            currentTransition = null;
            lastSuccessfulNavigation = null;
            events = new q;
            transitionAbortSubject = new q;
            configLoader = g(vp);
            environmentInjector = g(fe);
            destroyRef = g(Do);
            urlSerializer = g(ni);
            rootContexts = g(ir);
            location = g(Qt);
            inputBindingEnabled = g(ri, {
                optional: !0
            }) !== null;
            titleStrategy = g(gp);
            options = g(ii, {
                optional: !0
            }) || {};
            paramsInheritanceStrategy = this.options.paramsInheritanceStrategy || "emptyOnly";
            urlHandlingStrategy = g(vc);
            createViewTransition = g(Dp, {
                optional: !0
            });
            navigationErrorHandler = g(wp, {
                optional: !0
            });
            navigationId = 0;
            get hasRequestedNavigation() {
                return this.navigationId !== 0
            }
            transitions;
            afterPreactivation = () => C(void 0);
            rootComponentType = null;
            destroyed = !1;
            constructor() {
                let n = o => this.events.next(new Ja(o)),
                    r = o => this.events.next(new Xa(o));
                this.configLoader.onLoadEndListener = r, this.configLoader.onLoadStartListener = n, this.destroyRef.onDestroy(() => {
                    this.destroyed = !0
                })
            }
            complete() {
                this.transitions?.complete()
            }
            handleNavigationRequest(n) {
                let r = ++this.navigationId;
                this.transitions?.next(O(m({}, n), {
                    extractedUrl: this.urlHandlingStrategy.extract(n.rawUrl),
                    targetSnapshot: null,
                    targetRouterState: null,
                    guards: {
                        canActivateChecks: [],
                        canDeactivateChecks: []
                    },
                    guardsResult: null,
                    id: r
                }))
            }
            setupNavigations(n) {
                return this.transitions = new Z(null), this.transitions.pipe(ge(r => r !== null), me(r => {
                    let o = !1,
                        i = !1;
                    return C(r).pipe(me(s => {
                        if (this.navigationId > r.id) return this.cancelNavigationTransition(r, "", ce.SupersededByNewNavigation), te;
                        this.currentTransition = r, this.currentNavigation = {
                            id: s.id,
                            initialUrl: s.rawUrl,
                            extractedUrl: s.extractedUrl,
                            targetBrowserUrl: typeof s.extras.browserUrl == "string" ? this.urlSerializer.parse(s.extras.browserUrl) : s.extras.browserUrl,
                            trigger: s.source,
                            extras: s.extras,
                            previousNavigation: this.lastSuccessfulNavigation ? O(m({}, this.lastSuccessfulNavigation), {
                                previousNavigation: null
                            }) : null
                        };
                        let a = !n.navigated || this.isUpdatingInternalState() || this.isUpdatedBrowserUrl(),
                            c = s.extras.onSameUrlNavigation ?? n.onSameUrlNavigation;
                        if (!a && c !== "reload") {
                            let u = "";
                            return this.events.next(new et(s.id, this.urlSerializer.serialize(s.rawUrl), u, Zo.IgnoredSameUrlNavigation)), s.resolve(!1), te
                        }
                        if (this.urlHandlingStrategy.shouldProcessUrl(s.rawUrl)) return C(s).pipe(me(u => (this.events.next(new on(u.id, this.urlSerializer.serialize(u.extractedUrl), u.source, u.restoredState)), u.id !== this.navigationId ? te : Promise.resolve(u))), Zw(this.environmentInjector, this.configLoader, this.rootComponentType, n.config, this.urlSerializer, this.paramsInheritanceStrategy), Q(u => {
                            r.targetSnapshot = u.targetSnapshot, r.urlAfterRedirects = u.urlAfterRedirects, this.currentNavigation = O(m({}, this.currentNavigation), {
                                finalUrl: u.urlAfterRedirects
                            });
                            let l = new Qo(u.id, this.urlSerializer.serialize(u.extractedUrl), this.urlSerializer.serialize(u.urlAfterRedirects), u.targetSnapshot);
                            this.events.next(l)
                        }));
                        if (a && this.urlHandlingStrategy.shouldProcessUrl(s.currentRawUrl)) {
                            let {
                                id: u,
                                extractedUrl: l,
                                source: f,
                                restoredState: p,
                                extras: d
                            } = s, h = new on(u, this.urlSerializer.serialize(l), f, p);
                            this.events.next(h);
                            let y = rp(this.rootComponentType).snapshot;
                            return this.currentTransition = r = O(m({}, s), {
                                targetSnapshot: y,
                                urlAfterRedirects: l,
                                extras: O(m({}, d), {
                                    skipLocationChange: !1,
                                    replaceUrl: !1
                                })
                            }), this.currentNavigation.finalUrl = l, C(r)
                        } else {
                            let u = "";
                            return this.events.next(new et(s.id, this.urlSerializer.serialize(s.extractedUrl), u, Zo.IgnoredByUrlHandlingStrategy)), s.resolve(!1), te
                        }
                    }), Q(s => {
                        let a = new Za(s.id, this.urlSerializer.serialize(s.extractedUrl), this.urlSerializer.serialize(s.urlAfterRedirects), s.targetSnapshot);
                        this.events.next(a)
                    }), R(s => (this.currentTransition = r = O(m({}, s), {
                        guards: hw(s.targetSnapshot, s.currentSnapshot, this.rootContexts)
                    }), r)), Sw(this.environmentInjector, s => this.events.next(s)), Q(s => {
                        if (r.guardsResult = s.guardsResult, s.guardsResult && typeof s.guardsResult != "boolean") throw ei(this.urlSerializer, s.guardsResult);
                        let a = new Qa(s.id, this.urlSerializer.serialize(s.extractedUrl), this.urlSerializer.serialize(s.urlAfterRedirects), s.targetSnapshot, !!s.guardsResult);
                        this.events.next(a)
                    }), ge(s => s.guardsResult ? !0 : (this.cancelNavigationTransition(s, "", ce.GuardRejected), !1)), Ha(s => {
                        if (s.guards.canActivateChecks.length !== 0) return C(s).pipe(Q(a => {
                            let c = new Ya(a.id, this.urlSerializer.serialize(a.extractedUrl), this.urlSerializer.serialize(a.urlAfterRedirects), a.targetSnapshot);
                            this.events.next(c)
                        }), me(a => {
                            let c = !1;
                            return C(a).pipe(Qw(this.paramsInheritanceStrategy, this.environmentInjector), Q({
                                next: () => c = !0,
                                complete: () => {
                                    c || this.cancelNavigationTransition(a, "", ce.NoDataFromResolver)
                                }
                            }))
                        }), Q(a => {
                            let c = new Ka(a.id, this.urlSerializer.serialize(a.extractedUrl), this.urlSerializer.serialize(a.urlAfterRedirects), a.targetSnapshot);
                            this.events.next(c)
                        }))
                    }), Ha(s => {
                        let a = c => {
                            let u = [];
                            c.routeConfig?.loadComponent && !c.routeConfig._loadedComponent && u.push(this.configLoader.loadComponent(c.routeConfig).pipe(Q(l => {
                                c.component = l
                            }), R(() => {})));
                            for (let l of c.children) u.push(...a(l));
                            return u
                        };
                        return Nr(a(s.targetSnapshot.root)).pipe(Ze(null), xe(1))
                    }), Ha(() => this.afterPreactivation()), me(() => {
                        let {
                            currentSnapshot: s,
                            targetSnapshot: a
                        } = r, c = this.createViewTransition?.(this.environmentInjector, s.root, a.root);
                        return c ? H(c).pipe(R(() => r)) : C(r)
                    }), R(s => {
                        let a = uw(n.routeReuseStrategy, s.targetSnapshot, s.currentRouterState);
                        return this.currentTransition = r = O(m({}, s), {
                            targetRouterState: a
                        }), this.currentNavigation.targetRouterState = a, r
                    }), Q(() => {
                        this.events.next(new Jn)
                    }), pw(this.rootContexts, n.routeReuseStrategy, s => this.events.next(s), this.inputBindingEnabled), xe(1), Q({
                        next: s => {
                            o = !0, this.lastSuccessfulNavigation = this.currentNavigation, this.events.next(new Xe(s.id, this.urlSerializer.serialize(s.extractedUrl), this.urlSerializer.serialize(s.urlAfterRedirects))), this.titleStrategy?.updateTitle(s.targetRouterState.snapshot), s.resolve(!0)
                        },
                        complete: () => {
                            o = !0
                        }
                    }), Oi(this.transitionAbortSubject.pipe(Q(s => {
                        throw s
                    }))), pn(() => {
                        !o && !i && this.cancelNavigationTransition(r, "", ce.SupersededByNewNavigation), this.currentTransition?.id === r.id && (this.currentNavigation = null, this.currentTransition = null)
                    }), We(s => {
                        if (this.destroyed) return r.resolve(!1), te;
                        if (i = !0, up(s)) this.events.next(new Ue(r.id, this.urlSerializer.serialize(r.extractedUrl), s.message, s.cancellationCode)), fw(s) ? this.events.next(new sn(s.url, s.navigationBehaviorOptions)) : r.resolve(!1);
                        else {
                            let a = new Kn(r.id, this.urlSerializer.serialize(r.extractedUrl), s, r.targetSnapshot ?? void 0);
                            try {
                                let c = Ee(this.environmentInjector, () => this.navigationErrorHandler?.(a));
                                if (c instanceof er) {
                                    let {
                                        message: u,
                                        cancellationCode: l
                                    } = ei(this.urlSerializer, c);
                                    this.events.next(new Ue(r.id, this.urlSerializer.serialize(r.extractedUrl), u, l)), this.events.next(new sn(c.redirectTo, c.navigationBehaviorOptions))
                                } else throw this.events.next(a), s
                            } catch (c) {
                                this.options.resolveNavigationPromiseOnError ? r.resolve(!1) : r.reject(c)
                            }
                        }
                        return te
                    }))
                }))
            }
            cancelNavigationTransition(n, r, o) {
                let i = new Ue(n.id, this.urlSerializer.serialize(n.extractedUrl), r, o);
                this.events.next(i), n.resolve(!1)
            }
            isUpdatingInternalState() {
                return this.currentTransition?.extractedUrl.toString() !== this.currentTransition?.currentUrlTree.toString()
            }
            isUpdatedBrowserUrl() {
                let n = this.urlHandlingStrategy.extract(this.urlSerializer.parse(this.location.path(!0))),
                    r = this.currentNavigation?.targetBrowserUrl ?? this.currentNavigation?.extractedUrl;
                return n.toString() !== r?.toString() && !this.currentNavigation?.extras.skipLocationChange
            }
            static \u0275fac = function(r) {
                return new(r || e)
            };
            static \u0275prov = w({
                token: e,
                factory: e.\u0275fac,
                providedIn: "root"
            })
        }
        return e
    })();

function rE(e) {
    return e !== qo
}
var oE = (() => {
        class e {
            static \u0275fac = function(r) {
                return new(r || e)
            };
            static \u0275prov = w({
                token: e,
                factory: () => g(iE),
                providedIn: "root"
            })
        }
        return e
    })(),
    hc = class {
        shouldDetach(t) {
            return !1
        }
        store(t, n) {}
        shouldAttach(t) {
            return !1
        }
        retrieve(t) {
            return null
        }
        shouldReuseRoute(t, n) {
            return t.routeConfig === n.routeConfig
        }
    },
    iE = (() => {
        class e extends hc {
            static \u0275fac = (() => {
                let n;
                return function(o) {
                    return (n || (n = Js(e)))(o || e)
                }
            })();
            static \u0275prov = w({
                token: e,
                factory: e.\u0275fac,
                providedIn: "root"
            })
        }
        return e
    })(),
    Cp = (() => {
        class e {
            urlSerializer = g(ni);
            options = g(ii, {
                optional: !0
            }) || {};
            canceledNavigationResolution = this.options.canceledNavigationResolution || "replace";
            location = g(Qt);
            urlHandlingStrategy = g(vc);
            urlUpdateStrategy = this.options.urlUpdateStrategy || "deferred";
            currentUrlTree = new ze;
            getCurrentUrlTree() {
                return this.currentUrlTree
            }
            rawUrlTree = this.currentUrlTree;
            getRawUrlTree() {
                return this.rawUrlTree
            }
            createBrowserPath({
                finalUrl: n,
                initialUrl: r,
                targetBrowserUrl: o
            }) {
                let i = n !== void 0 ? this.urlHandlingStrategy.merge(n, r) : r,
                    s = o ?? i;
                return s instanceof ze ? this.urlSerializer.serialize(s) : s
            }
            commitTransition({
                targetRouterState: n,
                finalUrl: r,
                initialUrl: o
            }) {
                r && n ? (this.currentUrlTree = r, this.rawUrlTree = this.urlHandlingStrategy.merge(r, o), this.routerState = n) : this.rawUrlTree = o
            }
            routerState = rp(null);
            getRouterState() {
                return this.routerState
            }
            stateMemento = this.createStateMemento();
            updateStateMemento() {
                this.stateMemento = this.createStateMemento()
            }
            createStateMemento() {
                return {
                    rawUrlTree: this.rawUrlTree,
                    currentUrlTree: this.currentUrlTree,
                    routerState: this.routerState
                }
            }
            resetInternalState({
                finalUrl: n
            }) {
                this.routerState = this.stateMemento.routerState, this.currentUrlTree = this.stateMemento.currentUrlTree, this.rawUrlTree = this.urlHandlingStrategy.merge(this.currentUrlTree, n ?? this.rawUrlTree)
            }
            static \u0275fac = function(r) {
                return new(r || e)
            };
            static \u0275prov = w({
                token: e,
                factory: () => g(sE),
                providedIn: "root"
            })
        }
        return e
    })(),
    sE = (() => {
        class e extends Cp {
            currentPageId = 0;
            lastSuccessfulId = -1;
            restoredState() {
                return this.location.getState()
            }
            get browserPageId() {
                return this.canceledNavigationResolution !== "computed" ? this.currentPageId : this.restoredState()?.\u0275routerPageId ?? this.currentPageId
            }
            registerNonRouterCurrentEntryChangeListener(n) {
                return this.location.subscribe(r => {
                    r.type === "popstate" && setTimeout(() => {
                        n(r.url, r.state, "popstate")
                    })
                })
            }
            handleRouterEvent(n, r) {
                n instanceof on ? this.updateStateMemento() : n instanceof et ? this.commitTransition(r) : n instanceof Qo ? this.urlUpdateStrategy === "eager" && (r.extras.skipLocationChange || this.setBrowserUrl(this.createBrowserPath(r), r)) : n instanceof Jn ? (this.commitTransition(r), this.urlUpdateStrategy === "deferred" && !r.extras.skipLocationChange && this.setBrowserUrl(this.createBrowserPath(r), r)) : n instanceof Ue && (n.code === ce.GuardRejected || n.code === ce.NoDataFromResolver) ? this.restoreHistory(r) : n instanceof Kn ? this.restoreHistory(r, !0) : n instanceof Xe && (this.lastSuccessfulId = n.id, this.currentPageId = this.browserPageId)
            }
            setBrowserUrl(n, {
                extras: r,
                id: o
            }) {
                let {
                    replaceUrl: i,
                    state: s
                } = r;
                if (this.location.isCurrentPathEqualTo(n) || i) {
                    let a = this.browserPageId,
                        c = m(m({}, s), this.generateNgRouterState(o, a));
                    this.location.replaceState(n, "", c)
                } else {
                    let a = m(m({}, s), this.generateNgRouterState(o, this.browserPageId + 1));
                    this.location.go(n, "", a)
                }
            }
            restoreHistory(n, r = !1) {
                if (this.canceledNavigationResolution === "computed") {
                    let o = this.browserPageId,
                        i = this.currentPageId - o;
                    i !== 0 ? this.location.historyGo(i) : this.getCurrentUrlTree() === n.finalUrl && i === 0 && (this.resetInternalState(n), this.resetUrlToCurrentUrlTree())
                } else this.canceledNavigationResolution === "replace" && (r && this.resetInternalState(n), this.resetUrlToCurrentUrlTree())
            }
            resetUrlToCurrentUrlTree() {
                this.location.replaceState(this.urlSerializer.serialize(this.getRawUrlTree()), "", this.generateNgRouterState(this.lastSuccessfulId, this.currentPageId))
            }
            generateNgRouterState(n, r) {
                return this.canceledNavigationResolution === "computed" ? {
                    navigationId: n,
                    \u0275routerPageId: r
                } : {
                    navigationId: n
                }
            }
            static \u0275fac = (() => {
                let n;
                return function(o) {
                    return (n || (n = Js(e)))(o || e)
                }
            })();
            static \u0275prov = w({
                token: e,
                factory: e.\u0275fac,
                providedIn: "root"
            })
        }
        return e
    })();

function Ip(e, t) {
    e.events.pipe(ge(n => n instanceof Xe || n instanceof Ue || n instanceof Kn || n instanceof et), R(n => n instanceof Xe || n instanceof et ? 0 : (n instanceof Ue ? n.code === ce.Redirect || n.code === ce.SupersededByNewNavigation : !1) ? 2 : 1), ge(n => n !== 2), xe(1)).subscribe(() => {
        t()
    })
}
var aE = {
        paths: "exact",
        fragment: "ignored",
        matrixParams: "ignored",
        queryParams: "exact"
    },
    cE = {
        paths: "subset",
        fragment: "ignored",
        matrixParams: "ignored",
        queryParams: "subset"
    },
    yc = (() => {
        class e {
            get currentUrlTree() {
                return this.stateManager.getCurrentUrlTree()
            }
            get rawUrlTree() {
                return this.stateManager.getRawUrlTree()
            }
            disposed = !1;
            nonRouterCurrentEntryChangeSubscription;
            console = g(rf);
            stateManager = g(Cp);
            options = g(ii, {
                optional: !0
            }) || {};
            pendingTasks = g(Gt);
            urlUpdateStrategy = this.options.urlUpdateStrategy || "deferred";
            navigationTransitions = g(Ep);
            urlSerializer = g(ni);
            location = g(Qt);
            urlHandlingStrategy = g(vc);
            _events = new q;
            get events() {
                return this._events
            }
            get routerState() {
                return this.stateManager.getRouterState()
            }
            navigated = !1;
            routeReuseStrategy = g(oE);
            onSameUrlNavigation = this.options.onSameUrlNavigation || "ignore";
            config = g(si, {
                optional: !0
            })?.flat() ?? [];
            componentInputBindingEnabled = !!g(ri, {
                optional: !0
            });
            constructor() {
                this.resetConfig(this.config), this.navigationTransitions.setupNavigations(this).subscribe({
                    error: n => {
                        this.console.warn(n)
                    }
                }), this.subscribeToNavigationEvents()
            }
            eventsSubscription = new $;
            subscribeToNavigationEvents() {
                let n = this.navigationTransitions.events.subscribe(r => {
                    try {
                        let o = this.navigationTransitions.currentTransition,
                            i = this.navigationTransitions.currentNavigation;
                        if (o !== null && i !== null) {
                            if (this.stateManager.handleRouterEvent(r, i), r instanceof Ue && r.code !== ce.Redirect && r.code !== ce.SupersededByNewNavigation) this.navigated = !0;
                            else if (r instanceof Xe) this.navigated = !0;
                            else if (r instanceof sn) {
                                let s = r.navigationBehaviorOptions,
                                    a = this.urlHandlingStrategy.merge(r.url, o.currentRawUrl),
                                    c = m({
                                        browserUrl: o.extras.browserUrl,
                                        info: o.extras.info,
                                        skipLocationChange: o.extras.skipLocationChange,
                                        replaceUrl: o.extras.replaceUrl || this.urlUpdateStrategy === "eager" || rE(o.source)
                                    }, s);
                                this.scheduleNavigation(a, qo, null, c, {
                                    resolve: o.resolve,
                                    reject: o.reject,
                                    promise: o.promise
                                })
                            }
                        }
                        lE(r) && this._events.next(r)
                    } catch (o) {
                        this.navigationTransitions.transitionAbortSubject.next(o)
                    }
                });
                this.eventsSubscription.add(n)
            }
            resetRootComponentType(n) {
                this.routerState.root.component = n, this.navigationTransitions.rootComponentType = n
            }
            initialNavigation() {
                this.setUpLocationChangeListener(), this.navigationTransitions.hasRequestedNavigation || this.navigateToSyncWithBrowser(this.location.path(!0), qo, this.stateManager.restoredState())
            }
            setUpLocationChangeListener() {
                this.nonRouterCurrentEntryChangeSubscription ??= this.stateManager.registerNonRouterCurrentEntryChangeListener((n, r, o) => {
                    this.navigateToSyncWithBrowser(n, o, r)
                })
            }
            navigateToSyncWithBrowser(n, r, o) {
                let i = {
                        replaceUrl: !0
                    },
                    s = o?.navigationId ? o : null;
                if (o) {
                    let c = m({}, o);
                    delete c.navigationId, delete c.\u0275routerPageId, Object.keys(c).length !== 0 && (i.state = c)
                }
                let a = this.parseUrl(n);
                this.scheduleNavigation(a, r, s, i)
            }
            get url() {
                return this.serializeUrl(this.currentUrlTree)
            }
            getCurrentNavigation() {
                return this.navigationTransitions.currentNavigation
            }
            get lastSuccessfulNavigation() {
                return this.navigationTransitions.lastSuccessfulNavigation
            }
            resetConfig(n) {
                this.config = n.map(mc), this.navigated = !1
            }
            ngOnDestroy() {
                this.dispose()
            }
            dispose() {
                this._events.unsubscribe(), this.navigationTransitions.complete(), this.nonRouterCurrentEntryChangeSubscription && (this.nonRouterCurrentEntryChangeSubscription.unsubscribe(), this.nonRouterCurrentEntryChangeSubscription = void 0), this.disposed = !0, this.eventsSubscription.unsubscribe()
            }
            createUrlTree(n, r = {}) {
                let {
                    relativeTo: o,
                    queryParams: i,
                    fragment: s,
                    queryParamsHandling: a,
                    preserveFragment: c
                } = r, u = c ? this.currentUrlTree.fragment : s, l = null;
                switch (a ?? this.options.defaultQueryParamsHandling) {
                    case "merge":
                        l = m(m({}, this.currentUrlTree.queryParams), i);
                        break;
                    case "preserve":
                        l = this.currentUrlTree.queryParams;
                        break;
                    default:
                        l = i || null
                }
                l !== null && (l = this.removeEmptyProps(l));
                let f;
                try {
                    let p = o ? o.snapshot : this.routerState.snapshot.root;
                    f = Xf(p)
                } catch {
                    (typeof n[0] != "string" || n[0][0] !== "/") && (n = []), f = this.currentUrlTree.root
                }
                return ep(f, n, l, u ?? null)
            }
            navigateByUrl(n, r = {
                skipLocationChange: !1
            }) {
                let o = rn(n) ? n : this.parseUrl(n),
                    i = this.urlHandlingStrategy.merge(o, this.rawUrlTree);
                return this.scheduleNavigation(i, qo, null, r)
            }
            navigate(n, r = {
                skipLocationChange: !1
            }) {
                return uE(n), this.navigateByUrl(this.createUrlTree(n, r), r)
            }
            serializeUrl(n) {
                return this.urlSerializer.serialize(n)
            }
            parseUrl(n) {
                try {
                    return this.urlSerializer.parse(n)
                } catch {
                    return this.urlSerializer.parse("/")
                }
            }
            isActive(n, r) {
                let o;
                if (r === !0 ? o = m({}, aE) : r === !1 ? o = m({}, cE) : o = r, rn(n)) return Ff(this.currentUrlTree, n, o);
                let i = this.parseUrl(n);
                return Ff(this.currentUrlTree, i, o)
            }
            removeEmptyProps(n) {
                return Object.entries(n).reduce((r, [o, i]) => (i != null && (r[o] = i), r), {})
            }
            scheduleNavigation(n, r, o, i, s) {
                if (this.disposed) return Promise.resolve(!1);
                let a, c, u;
                s ? (a = s.resolve, c = s.reject, u = s.promise) : u = new Promise((f, p) => {
                    a = f, c = p
                });
                let l = this.pendingTasks.add();
                return Ip(this, () => {
                    queueMicrotask(() => this.pendingTasks.remove(l))
                }), this.navigationTransitions.handleNavigationRequest({
                    source: r,
                    restoredState: o,
                    currentUrlTree: this.currentUrlTree,
                    currentRawUrl: this.currentUrlTree,
                    rawUrl: n,
                    extras: i,
                    resolve: a,
                    reject: c,
                    promise: u,
                    currentSnapshot: this.routerState.snapshot,
                    currentRouterState: this.routerState
                }), u.catch(f => Promise.reject(f))
            }
            static \u0275fac = function(r) {
                return new(r || e)
            };
            static \u0275prov = w({
                token: e,
                factory: e.\u0275fac,
                providedIn: "root"
            })
        }
        return e
    })();

function uE(e) {
    for (let t = 0; t < e.length; t++)
        if (e[t] == null) throw new v(4008, !1)
}

function lE(e) {
    return !(e instanceof Jn) && !(e instanceof sn)
}
var dE = new D("");

function Dc(e, ...t) {
    return js([{
            provide: si,
            multi: !0,
            useValue: e
        },
        [], {
            provide: Dt,
            useFactory: fE,
            deps: [yc]
        }, {
            provide: Ca,
            multi: !0,
            useFactory: pE
        },
        t.map(n => n.\u0275providers)
    ])
}

function fE(e) {
    return e.routerState.root
}

function pE() {
    let e = g(Ye);
    return t => {
        let n = e.get(pt);
        if (t !== n.components[0]) return;
        let r = e.get(yc),
            o = e.get(hE);
        e.get(gE) === 1 && r.initialNavigation(), e.get(mE, null, b.Optional)?.setUpPreloading(), e.get(dE, null, b.Optional)?.init(), r.resetRootComponentType(n.componentTypes[0]), o.closed || (o.next(), o.complete(), o.unsubscribe())
    }
}
var hE = new D("", {
        factory: () => new q
    }),
    gE = new D("", {
        providedIn: "root",
        factory: () => 1
    });
var mE = new D("");
var bp = [];
var Sp = {
    providers: [gf({
        eventCoalescing: !0
    }), Dc(bp)]
};
var yE = ["littenImg"],
    DE = (e, t) => t.id;

function wE(e, t) {
    if (e & 1 && (Ln(0, "div", 3), Vn(1, "img", 4, 0)(3, "img", 5), jn()), e & 2) {
        let n = t.$implicit;
        Fn("z-index", n.depth), bo(), Fn("top", n.top + n.verticalOffset, "px")("left", n.left, "px")("transform", "rotate(" + n.rotation + "deg) scaleX(" + (n.isFlipped ? -1 : 1) + ")")("width", n.isGroudon ? 300 : 150, "px"), ba("shiny", n.isShiny)("groudon", n.isGroudon), Ia("src", n.isGroudon ? n.isShiny ? "/assets/shinygroudon.gif" : "/assets/groudon.gif" : n.isShiny ? "/assets/ShinyLitten.png" : "/assets/Litten.png", yd), bo(2), Fn("top", n.top + 40, "px")("left", n.left + 20, "px")("width", n.isGroudon ? 200 : 100, "px")
    }
}
var ai = class e {
    littenImg;
    title = "littenSwarm";
    littens = [];
    littenCount = 0;
    animationFrame = 0;
    lastTimestamp = 0;
    constructor() {
        this.animate = this.animate.bind(this)
    }
    onResize() {
        this.littens = this.littens.map(t => O(m({}, t), {
            top: Math.min(t.top, window.innerHeight - 150),
            depth: Math.floor(t.top)
        }))
    }
    ngOnInit() {
        this.startLittenSpawn(), this.lastTimestamp = performance.now(), this.animate()
    }
    ngOnDestroy() {
        this.animationFrame && cancelAnimationFrame(this.animationFrame)
    }
    animate(t = 0) {
        let n = t - this.lastTimestamp;
        this.lastTimestamp = t, this.littens = this.littens.map(r => {
            if (!r.isPaused && Math.random() < .001) return O(m({}, r), {
                isPaused: !0,
                pauseEndTime: t + (1e3 + Math.random() * 2e3),
                flipCount: 0,
                lastFlipTime: t,
                isFlipped: r.direction === "right"
            });
            if (r.isPaused && r.flipCount < 4 && t - r.lastFlipTime >= 250) return O(m({}, r), {
                isFlipped: !r.isFlipped,
                flipCount: r.flipCount + 1,
                lastFlipTime: t
            });
            if (r.isPaused && t >= r.pauseEndTime) return O(m({}, r), {
                isPaused: !1,
                pauseEndTime: 0,
                isFlipped: r.direction === "right"
            });
            let o = r.isPaused ? r.left : r.left + (r.direction === "right" ? 1 : -1) * (r.speed * n / 16),
                i = r.phase + r.frequency * n / 16,
                s = Math.sin(i) * 10,
                a = r.verticalOffset;
            return t - r.lastBump > 200 && (r.verticalOffset === 0 ? a = -10 : t - r.lastBump > 400 && (a = 0, r.lastBump = t)), O(m({}, r), {
                left: o,
                phase: i,
                rotation: s,
                verticalOffset: a,
                depth: Math.floor(r.top)
            })
        }), this.littens = this.littens.filter(r => r.direction === "left" && r.left > -150 || r.direction === "right" && r.left < window.innerWidth + 150), this.animationFrame = requestAnimationFrame(this.animate)
    }
    startLittenSpawn() {
        setInterval(() => {
            let t = Math.random() < .000244140625,
                n = Math.random() < 1 / 683,
                r = t ? 1.5 : 2 + Math.random(),
                o = .02 + Math.random() * .03,
                i;
            if (t) {
                let a = window.innerHeight / 2;
                i = a + Math.random() * (window.innerHeight - a - (t ? 300 : 150))
            } else i = Math.random() * (window.innerHeight - 150) + 10;
            let s = Math.random() < .5 ? "left" : "right";
            this.littens.push({
                id: this.littenCount++,
                top: i,
                left: s === "left" ? window.innerWidth : -150,
                isShiny: n,
                isGroudon: t,
                speed: r,
                verticalOffset: 0,
                rotation: 0,
                phase: Math.random() * Math.PI * 2,
                frequency: o,
                lastBump: performance.now(),
                depth: Math.floor(i + (t ? 150 : 0)),
                isPaused: !1,
                pauseEndTime: 0,
                isFlipped: s === "right",
                flipCount: 0,
                lastFlipTime: 0,
                direction: s
            })
        }, 200)
    }
    static \u0275fac = function(n) {
        return new(n || e)
    };
    static \u0275cmp = xo({
        type: e,
        selectors: [
            ["app-root"]
        ],
        viewQuery: function(n, r) {
            if (n & 1 && lf(yE, 5), n & 2) {
                let o;
                df(o = ff()) && (r.littenImg = o.first)
            }
        },
        hostBindings: function(n, r) {
            n & 1 && Sa("resize", function() {
                return r.onResize()
            }, !1, Dd)
        },
        decls: 3,
        vars: 0,
        consts: [
            ["littenImg", ""],
            [1, "container"],
            [1, "litten-container", 3, "z-index"],
            [1, "litten-container"],
            ["alt", "Litten", 1, "litten", 3, "src"],
            ["src", "/assets/littenShadow.png", "alt", "Shadow", 1, "shadow"]
        ],
        template: function(n, r) {
            n & 1 && (Ln(0, "div", 1), cf(1, wE, 4, 21, "div", 2, DE), jn()), n & 2 && (bo(), uf(r.littens))
        },
        dependencies: [ko],
        styles: [".container[_ngcontent-%COMP%]{width:100vw;height:100vh;background-color:#0f0;background-image:url(littenSwarm/assets/grassfield.png);background-repeat:repeat;background-size:1000px;position:relative;overflow:hidden;image-rendering:pixelated;image-rendering:-moz-crisp-edges;image-rendering:crisp-edges}.litten-container[_ngcontent-%COMP%]{position:absolute}.litten[_ngcontent-%COMP%]{position:absolute;width:150px;height:auto;image-rendering:pixelated;image-rendering:-moz-crisp-edges;image-rendering:crisp-edges;transition:left .1s linear;transform-origin:center center;z-index:2}.shadow[_ngcontent-%COMP%]{position:absolute;width:100px;height:auto;transition:left .1s linear;opacity:.5;mix-blend-mode:multiply;z-index:1}.shiny[_ngcontent-%COMP%]{filter:brightness(1.2) contrast(1.2)}.groudon[_ngcontent-%COMP%]{filter:drop-shadow(0 0 10px rgba(255,0,0,.5))}"]
    })
};
ja(ai, Sp).catch(e => console.error(e));
