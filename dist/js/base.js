(function(window) {
    var Obj = function(ops) {
        this.$el = ops.$el ? ops.$el : undefined;
        this.el = ops.el ? ops.el : undefined;
        this.w = this.checkProperty(ops.w, 20);
        this.h = this.checkProperty(ops.h, 20);
        this.mass = this.checkProperty(ops.mass, 1);
        this.radius = this.checkProperty(ops.radius, 0);
        this.diameter = this.checkProperty(ops.radius * 2, 0);
        this.x = 0;
        this.y = 0;
        this.vx = 0;
        this.vy = 0;
        this.hx = 0;
        this.hy = 0;
        this.ex = 0;
        this.ey = 0;
        this.prefix = this.getPrefix();
        this.prefixJs = this.prefix.js;
    };
    Obj.prototype = {
        get home() {
            return new Vector(this.hx, this.hy);
        },
        set home(home) {
            this.hx = home.x;
            this.hy = home.y;
        },
        get pos() {
            return new Vector(this.x, this.y);
        },
        set pos(pos) {
            this.x = pos.x;
            this.y = pos.y;
        },
        get velo() {
            return new Vector(this.vx, this.vy);
        },
        set velo(velo) {
            this.vx = velo.x;
            this.vy = velo.y;
        },
        get end() {
            return new Vector(this.ex, this.ey);
        },
        set end(end) {
            this.ex = end.x;
            this.ey = end.y;
        },
        checkProperty: function(param, val) {
            var newParam = param;
            if (typeof newParam === "undefined") {
                newParam = val;
            }
            return newParam;
        },
        getPrefix: function() {
            var styles = window.getComputedStyle(document.documentElement, "");
            var pre = (Array.prototype.slice.call(styles).join("").match(/-(moz|webkit|ms)-/) || styles.OLink === "" && [ "", "o" ])[1];
            var dom = "WebKit|Moz|MS|O".match(new RegExp("(" + pre + ")", "i"))[1];
            return {
                dom: dom,
                lowercase: pre,
                css: "-" + pre + "-",
                js: pre[0].toUpperCase() + pre.substr(1)
            };
        },
        changeStyles: function() {
            this.$el.css(this.prefixJs + "Transform", "translate3d(" + this.x + "px, " + this.y + "px, 0)");
        }
    };
    window.Obj = Obj;
})(window);
(function(window) {
    var Vector = function(x, y) {
        this.x = x;
        this.y = y;
    };
    Vector.prototype = {
        lengthSquared: function() {
            return this.x * this.x + this.y * this.y;
        },
        length: function() {
            return Math.sqrt(this.lengthSquared());
        },
        greater: function(vec) {
            if (this.x >= vec.x && this.y >= vec.y) {
                return true;
            }
            return false;
        },
        addScaled: function(vec, k) {
            return new Vector(this.x + k * vec.x, this.y + k * vec.y);
        },
        subtract: function(vec) {
            return new Vector(this.x - vec.x, this.y - vec.y);
        },
        setBoundaries: function(bonX, bonY, radius) {
            if (this.x < bonX.minX) {
                this.x = bonX.minX;
            }
            if (this.x > bonX.maxX - radius) {
                this.x = bonX.maxX - radius;
            }
            if (this.y < bonY.minY) {
                this.y = bonY.minY;
            }
            if (this.y > bonY.maxY - radius) {
                this.y = bonY.maxY - radius;
            }
            return new Vector(this.x, this.y);
        },
        multiply: function(k) {
            return new Vector(k * this.x, k * this.y);
        },
        divide: function(k) {
            return new Vector(this.x / k, this.y / k);
        },
        isChangeDirection: function(vec, direction, axis) {
            var newDirection;
            if (this[axis] < vec[axis] && direction !== "firstSide" || this[axis] > vec[axis] && direction !== "secondSide") {
                return true;
            } else if (this[axis] >= vec[axis]) {
                return false;
            }
        },
        add: function(vec) {
            return new Vector(this.x + vec.x, this.y + vec.y);
        },
        addScalar: function(k) {
            this.x += k;
            this.y += k;
        },
        negate: function() {
            this.x = -this.x;
            this.y = -this.y;
        },
        incrementBy: function(vec) {
            this.x += vec.x;
            this.y += vec.y;
        },
        perp: function(u, anticlockwise) {
            if (typeof anticlockwise === "undefined") {
                anticlockwise = true;
            }
            var length = this.length();
            var vec = new Vector(this.y, (-this.x));
            if (length > 0) {
                if (anticlockwise) {
                    vec.scaleBy(u / length);
                } else {
                    vec.scaleBy(-u / length);
                }
            } else {
                vec = new Vector(0, 0);
            }
            return vec;
        },
        projection: function(vec) {
            var length = this.length();
            var lengthVec = vec.length();
            var proj;
            if (length == 0 || lengthVec == 0) {
                proj = 0;
            } else {
                proj = (this.x * vec.x + this.y * vec.y) / lengthVec;
            }
            return proj;
        },
        unit: function() {
            var length = this.length();
            if (length > 0) {
                return new Vector(this.x / length, this.y / length);
            } else {
                return new Vector(0, 0);
            }
        },
        dotProduct: function(vec) {
            return this.x * vec.x + this.y * vec.y;
        },
        scaleBy: function(k) {
            this.x *= k;
            this.y *= k;
        },
        transfer: function(k) {
            var vec = new Vector(this.x, this.y);
            var unitVec = vec.unit();
            unitVec.scaleBy(k);
            return unitVec;
        },
        para: function(u, positive) {
            if (typeof positive === "undefined") {
                positive = true;
            }
            var length = this.length();
            var vec = new Vector(this.x, this.y);
            if (positive) {
                vec.scaleBy(u / length);
            } else {
                vec.scaleBy(-u / length);
            }
            return vec;
        },
        project: function(vec) {
            return vec.para(this.projection(vec));
        }
    };
    Vector.add = function(arr) {
        var vectorSum = new Vector(0, 0);
        for (var i = 0; i < arr.length; i++) {
            var vector = arr[i];
            vectorSum.incrementBy(vector);
        }
        return vectorSum;
    };
    Vector.angleBetween = function(vec1, vec2) {
        return Math.acos(vec1.dotProduct(vec2) / (vec1.length() * vec2.length()));
    };
    window.Vector = Vector;
})(window);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm9iai5qcyIsInZlY3Rvci5qcyJdLCJuYW1lcyI6WyJ3aW5kb3ciLCJPYmoiLCJvcHMiLCJ0aGlzIiwiJGVsIiwidW5kZWZpbmVkIiwiZWwiLCJ3IiwiY2hlY2tQcm9wZXJ0eSIsImgiLCJtYXNzIiwicmFkaXVzIiwiZGlhbWV0ZXIiLCJ4IiwieSIsInZ4IiwidnkiLCJoeCIsImh5IiwiZXgiLCJleSIsInByZWZpeCIsImdldFByZWZpeCIsInByZWZpeEpzIiwianMiLCJwcm90b3R5cGUiLCJob21lIiwiVmVjdG9yIiwicG9zIiwidmVsbyIsImVuZCIsInBhcmFtIiwidmFsIiwibmV3UGFyYW0iLCJzdHlsZXMiLCJnZXRDb21wdXRlZFN0eWxlIiwiZG9jdW1lbnQiLCJkb2N1bWVudEVsZW1lbnQiLCJwcmUiLCJBcnJheSIsInNsaWNlIiwiY2FsbCIsImpvaW4iLCJtYXRjaCIsIk9MaW5rIiwiZG9tIiwiUmVnRXhwIiwibG93ZXJjYXNlIiwiY3NzIiwidG9VcHBlckNhc2UiLCJzdWJzdHIiLCJjaGFuZ2VTdHlsZXMiLCJsZW5ndGhTcXVhcmVkIiwibGVuZ3RoIiwiTWF0aCIsInNxcnQiLCJncmVhdGVyIiwidmVjIiwiYWRkU2NhbGVkIiwiayIsInN1YnRyYWN0Iiwic2V0Qm91bmRhcmllcyIsImJvblgiLCJib25ZIiwibWluWCIsIm1heFgiLCJtaW5ZIiwibWF4WSIsIm11bHRpcGx5IiwiZGl2aWRlIiwiaXNDaGFuZ2VEaXJlY3Rpb24iLCJkaXJlY3Rpb24iLCJheGlzIiwibmV3RGlyZWN0aW9uIiwiYWRkIiwiYWRkU2NhbGFyIiwibmVnYXRlIiwiaW5jcmVtZW50QnkiLCJwZXJwIiwidSIsImFudGljbG9ja3dpc2UiLCJzY2FsZUJ5IiwicHJvamVjdGlvbiIsImxlbmd0aFZlYyIsInByb2oiLCJ1bml0IiwiZG90UHJvZHVjdCIsInRyYW5zZmVyIiwidW5pdFZlYyIsInBhcmEiLCJwb3NpdGl2ZSIsInByb2plY3QiLCJhcnIiLCJ2ZWN0b3JTdW0iLCJpIiwi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QUFJRTtZQUNqQkQsVUFBVWhCLFlBQVlrQjs7UUFFMUIsT0FBT0Y7O0lBR1hsRSxPQUFPcUUsZUFBZSxTQUFVQyxNQUFNQztRQUNsQyxPQUFPNUMsS0FBSzZDLEtBQUtGLEtBQUtYLFdBQVdZLFNBQVNELEtBQUs1QyxXQUFXNkMsS0FBSzdDOztJQUduRXJELE9BQU8yQixTQUFTQTtHQUNqQjNCIiwiZmlsZSI6ImJhc2UuanMiLCJzb3VyY2VzQ29udGVudCI6WyI7KGZ1bmN0aW9uICh3aW5kb3cpIHtcbiAgICB2YXIgT2JqID0gZnVuY3Rpb24gKG9wcykge1xuICAgICAgICB0aGlzLiRlbCA9IChvcHMuJGVsKSA/IG9wcy4kZWwgOiB1bmRlZmluZWQ7XG4gICAgICAgIHRoaXMuZWwgPSAob3BzLmVsKSA/IG9wcy5lbCA6IHVuZGVmaW5lZDtcbiAgICAgICAgdGhpcy53ID0gdGhpcy5jaGVja1Byb3BlcnR5KG9wcy53LCAyMCk7XG4gICAgICAgIHRoaXMuaCA9IHRoaXMuY2hlY2tQcm9wZXJ0eShvcHMuaCwgMjApO1xuICAgICAgICB0aGlzLm1hc3MgPSB0aGlzLmNoZWNrUHJvcGVydHkob3BzLm1hc3MsIDEpO1xuICAgICAgICB0aGlzLnJhZGl1cyA9IHRoaXMuY2hlY2tQcm9wZXJ0eShvcHMucmFkaXVzLCAwKTtcbiAgICAgICAgdGhpcy5kaWFtZXRlciA9IHRoaXMuY2hlY2tQcm9wZXJ0eShvcHMucmFkaXVzICogMiwgMClcbiAgICAgICAgdGhpcy54ID0gMDtcbiAgICAgICAgdGhpcy55ID0gMDtcbiAgICAgICAgdGhpcy52eCA9IDA7XG4gICAgICAgIHRoaXMudnkgPSAwO1xuICAgICAgICB0aGlzLmh4ID0gMDtcbiAgICAgICAgdGhpcy5oeSA9IDA7XG4gICAgICAgIHRoaXMuZXggPSAwO1xuICAgICAgICB0aGlzLmV5ID0gMDtcbiAgICAgICAgdGhpcy5wcmVmaXggPSB0aGlzLmdldFByZWZpeCgpO1xuICAgICAgICB0aGlzLnByZWZpeEpzID0gdGhpcy5wcmVmaXguanM7XG4gICAgfTtcblxuICAgIE9iai5wcm90b3R5cGUgPSB7XG4gICAgICAgIGdldCBob21lICgpIHtcbiAgICAgICAgICAgIHJldHVybiBuZXcgVmVjdG9yKHRoaXMuaHgsIHRoaXMuaHkpO1xuICAgICAgICB9LFxuXG4gICAgICAgIHNldCBob21lIChob21lKSB7XG4gICAgICAgICAgICB0aGlzLmh4ID0gaG9tZS54O1xuICAgICAgICAgICAgdGhpcy5oeSA9IGhvbWUueTtcbiAgICAgICAgfSxcblxuICAgICAgICBnZXQgcG9zICgpIHtcbiAgICAgICAgICAgIHJldHVybiBuZXcgVmVjdG9yKHRoaXMueCwgdGhpcy55KTtcbiAgICAgICAgfSxcblxuICAgICAgICBzZXQgcG9zIChwb3MpIHtcbiAgICAgICAgICAgIHRoaXMueCA9IHBvcy54O1xuICAgICAgICAgICAgdGhpcy55ID0gcG9zLnk7XG4gICAgICAgIH0sXG5cbiAgICAgICAgZ2V0IHZlbG8gKCkge1xuICAgICAgICAgICAgcmV0dXJuIG5ldyBWZWN0b3IodGhpcy52eCwgdGhpcy52eSk7XG4gICAgICAgIH0sXG5cbiAgICAgICAgc2V0IHZlbG8gKHZlbG8pIHtcbiAgICAgICAgICAgIHRoaXMudnggPSB2ZWxvLng7XG4gICAgICAgICAgICB0aGlzLnZ5ID0gdmVsby55O1xuICAgICAgICB9LFxuXG4gICAgICAgIGdldCBlbmQgKCkge1xuICAgICAgICAgICAgcmV0dXJuIG5ldyBWZWN0b3IodGhpcy5leCwgdGhpcy5leSk7XG4gICAgICAgIH0sXG5cbiAgICAgICAgc2V0IGVuZCAoZW5kKSB7XG4gICAgICAgICAgICB0aGlzLmV4ID0gZW5kLng7XG4gICAgICAgICAgICB0aGlzLmV5ID0gZW5kLnk7XG4gICAgICAgIH0sXG5cbiAgICAgICAgY2hlY2tQcm9wZXJ0eTogZnVuY3Rpb24gKHBhcmFtLCB2YWwpIHtcbiAgICAgICAgICAgIHZhciBuZXdQYXJhbSA9IHBhcmFtO1xuICAgICAgICAgICAgaWYgKHR5cGVvZihuZXdQYXJhbSkgPT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgICAgICAgICAgbmV3UGFyYW0gPSB2YWw7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHJldHVybiBuZXdQYXJhbTtcbiAgICAgICAgfSxcblxuICAgICAgICBnZXRQcmVmaXg6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHZhciBzdHlsZXMgPSB3aW5kb3cuZ2V0Q29tcHV0ZWRTdHlsZShkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQsICcnKTtcbiAgICAgICAgICAgIHZhciBwcmUgPSAoQXJyYXkucHJvdG90eXBlLnNsaWNlLmNhbGwoc3R5bGVzKS5qb2luKCcnKS5tYXRjaCgvLShtb3p8d2Via2l0fG1zKS0vKSB8fFxuICAgICAgICAgICAgICAgICAgICAoc3R5bGVzLk9MaW5rID09PSAnJyAmJiBbJycsICdvJ10pKVsxXTtcbiAgICAgICAgICAgIHZhciBkb20gPSAoJ1dlYktpdHxNb3p8TVN8TycpLm1hdGNoKG5ldyBSZWdFeHAoJygnICsgcHJlICsgJyknLCAnaScpKVsxXTtcbiAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgICAgZG9tOiBkb20sXG4gICAgICAgICAgICAgICAgbG93ZXJjYXNlOiBwcmUsXG4gICAgICAgICAgICAgICAgY3NzOiAnLScgKyBwcmUgKyAnLScsXG4gICAgICAgICAgICAgICAganM6IHByZVswXS50b1VwcGVyQ2FzZSgpICsgcHJlLnN1YnN0cigxKVxuICAgICAgICAgICAgfTtcbiAgICAgICAgfSxcblxuICAgICAgICBjaGFuZ2VTdHlsZXM6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHRoaXMuJGVsLmNzcyh0aGlzLnByZWZpeEpzICsgJ1RyYW5zZm9ybScsICd0cmFuc2xhdGUzZCgnICsgdGhpcy54ICsgJ3B4LCAnICsgdGhpcy55ICsgJ3B4LCAwKScpO1xuICAgICAgICB9XG4gICAgfTtcblxuICAgIHdpbmRvdy5PYmogPSBPYmo7XG5cbn0gKHdpbmRvdykpO1xuIiwiOyhmdW5jdGlvbiAod2luZG93KSB7XG4gICAgdmFyIFZlY3RvciA9IGZ1bmN0aW9uICh4LCB5KSB7XG4gICAgICAgIHRoaXMueCA9IHg7XG4gICAgICAgIHRoaXMueSA9IHk7XG4gICAgfTtcblxuICAgIFZlY3Rvci5wcm90b3R5cGUgPSB7XG4gICAgICAgIGxlbmd0aFNxdWFyZWQ6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLnggKiB0aGlzLnggKyB0aGlzLnkgKiB0aGlzLnk7XG4gICAgICAgIH0sXG5cbiAgICAgICAgbGVuZ3RoOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICByZXR1cm4gTWF0aC5zcXJ0KHRoaXMubGVuZ3RoU3F1YXJlZCgpKTtcbiAgICAgICAgfSxcblxuICAgICAgICBncmVhdGVyOiBmdW5jdGlvbiAodmVjKSB7XG5cbiAgICAgICAgICAgIGlmICh0aGlzLnggPj0gdmVjLnggJiZcbiAgICAgICAgICAgICAgICB0aGlzLnkgPj0gdmVjLnkpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9LFxuXG4gICAgICAgIGFkZFNjYWxlZDogZnVuY3Rpb24gKHZlYywgaykge1xuICAgICAgICAgICAgcmV0dXJuIG5ldyBWZWN0b3IodGhpcy54ICsgayAqIHZlYy54LCB0aGlzLnkgKyBrICogdmVjLnkpO1xuICAgICAgICB9LFxuXG4gICAgICAgIHN1YnRyYWN0OiBmdW5jdGlvbiAodmVjKSB7XG4gICAgICAgICAgICByZXR1cm4gbmV3IFZlY3Rvcih0aGlzLnggLSB2ZWMueCwgdGhpcy55IC0gdmVjLnkpO1xuICAgICAgICB9LFxuXG4gICAgICAgIHNldEJvdW5kYXJpZXM6IGZ1bmN0aW9uIChib25YLCBib25ZLCByYWRpdXMpIHtcbiAgICAgICAgICAgIGlmICh0aGlzLnggPCBib25YLm1pblgpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnggPSBib25YLm1pblg7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmICh0aGlzLnggPiBib25YLm1heFggLSByYWRpdXMpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnggPSBib25YLm1heFggLSByYWRpdXM7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmICh0aGlzLnkgPCBib25ZLm1pblkpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnkgPSBib25ZLm1pblk7XG5cbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKHRoaXMueSA+IGJvblkubWF4WSAtIHJhZGl1cykge1xuICAgICAgICAgICAgICAgIHRoaXMueSA9IGJvblkubWF4WSAtIHJhZGl1cztcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgcmV0dXJuIG5ldyBWZWN0b3IodGhpcy54LCB0aGlzLnkpO1xuICAgICAgICB9LFxuXG4gICAgICAgIG11bHRpcGx5OiBmdW5jdGlvbiAoaykge1xuICAgICAgICAgICAgcmV0dXJuIG5ldyBWZWN0b3IoayAqIHRoaXMueCwgayAqIHRoaXMueSk7XG4gICAgICAgIH0sXG5cbiAgICAgICAgZGl2aWRlOiBmdW5jdGlvbiAoaykge1xuICAgICAgICAgICAgcmV0dXJuIG5ldyBWZWN0b3IodGhpcy54IC8gaywgdGhpcy55IC8gayk7XG4gICAgICAgIH0sXG5cbiAgICAgICAgaXNDaGFuZ2VEaXJlY3Rpb246IGZ1bmN0aW9uICh2ZWMsIGRpcmVjdGlvbiwgYXhpcykge1xuICAgICAgICAgICAgdmFyIG5ld0RpcmVjdGlvbjtcblxuICAgICAgICAgICAgaWYgKCh0aGlzW2F4aXNdIDwgdmVjW2F4aXNdICYmIGRpcmVjdGlvbiAhPT0gJ2ZpcnN0U2lkZScpIHx8XG4gICAgICAgICAgICAgICAgKHRoaXNbYXhpc10gPiB2ZWNbYXhpc10gJiYgZGlyZWN0aW9uICE9PSAnc2Vjb25kU2lkZScpKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKHRoaXNbYXhpc10gPj0gdmVjW2F4aXNdKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgfVxuICAgICAgICB9LFxuXG4gICAgICAgIGFkZDogZnVuY3Rpb24gKHZlYykge1xuICAgICAgICAgICAgcmV0dXJuIG5ldyBWZWN0b3IodGhpcy54ICsgdmVjLngsIHRoaXMueSArIHZlYy55KTtcbiAgICAgICAgfSxcblxuICAgICAgICBhZGRTY2FsYXI6IGZ1bmN0aW9uIChrKSB7XG4gICAgICAgICAgICB0aGlzLnggKz0gaztcbiAgICAgICAgICAgIHRoaXMueSArPSBrO1xuICAgICAgICB9LFxuXG4gICAgICAgIG5lZ2F0ZTogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgdGhpcy54ID0gLXRoaXMueDtcbiAgICAgICAgICAgIHRoaXMueSA9IC10aGlzLnk7XG4gICAgICAgIH0sXG5cbiAgICAgICAgaW5jcmVtZW50Qnk6IGZ1bmN0aW9uICh2ZWMpIHtcbiAgICAgICAgICAgIHRoaXMueCArPSB2ZWMueDtcbiAgICAgICAgICAgIHRoaXMueSArPSB2ZWMueTtcbiAgICAgICAgfSxcblxuICAgICAgICBwZXJwOiBmdW5jdGlvbiAodSwgYW50aWNsb2Nrd2lzZSkge1xuICAgICAgICAgICAgaWYgKHR5cGVvZihhbnRpY2xvY2t3aXNlKSA9PT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgICAgICAgICBhbnRpY2xvY2t3aXNlID0gdHJ1ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHZhciBsZW5ndGggPSB0aGlzLmxlbmd0aCgpO1xuICAgICAgICAgICAgdmFyIHZlYyA9IG5ldyBWZWN0b3IodGhpcy55LCAtdGhpcy54KTtcbiAgICAgICAgICAgIGlmIChsZW5ndGggPiAwKSB7XG4gICAgICAgICAgICAgICAgaWYgKGFudGljbG9ja3dpc2UpeyAvLyBhbnRpY2xvY2t3aXNlIHdpdGggcmVzcGVjdCB0byBjYW52YXMgY29vcmRpbmF0ZSBzeXN0ZW1cbiAgICAgICAgICAgICAgICAgICAgdmVjLnNjYWxlQnkodSAvIGxlbmd0aCk7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgdmVjLnNjYWxlQnkoLXUgLyBsZW5ndGgpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgdmVjID0gbmV3IFZlY3RvcigwLCAwKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiB2ZWM7XG4gICAgICAgIH0sXG5cbiAgICAgICAgcHJvamVjdGlvbjogZnVuY3Rpb24gKHZlYykge1xuICAgICAgICAgICAgdmFyIGxlbmd0aCA9IHRoaXMubGVuZ3RoKCk7XG4gICAgICAgICAgICB2YXIgbGVuZ3RoVmVjID0gdmVjLmxlbmd0aCgpO1xuICAgICAgICAgICAgdmFyIHByb2o7XG4gICAgICAgICAgICBpZiAoKGxlbmd0aCA9PSAwKSB8fCAobGVuZ3RoVmVjID09IDApKXtcbiAgICAgICAgICAgICAgICBwcm9qID0gMDtcbiAgICAgICAgICAgIH1lbHNlIHtcbiAgICAgICAgICAgICAgICBwcm9qID0gKHRoaXMueCAqIHZlYy54ICsgdGhpcy55ICogdmVjLnkpIC8gbGVuZ3RoVmVjO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIHByb2o7XG4gICAgICAgIH0sXG5cbiAgICAgICAgdW5pdDogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgdmFyIGxlbmd0aCA9IHRoaXMubGVuZ3RoKCk7XG5cbiAgICAgICAgICAgIGlmIChsZW5ndGggPiAwKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIG5ldyBWZWN0b3IodGhpcy54IC8gbGVuZ3RoLCB0aGlzLnkgLyBsZW5ndGgpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gbmV3IFZlY3RvcigwLCAwKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSxcblxuICAgICAgICBkb3RQcm9kdWN0OiBmdW5jdGlvbiAodmVjKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy54ICogdmVjLnggKyB0aGlzLnkgKiB2ZWMueTtcbiAgICAgICAgfSxcblxuICAgICAgICBzY2FsZUJ5OiBmdW5jdGlvbiAoaykge1xuICAgICAgICAgICAgdGhpcy54ICo9IGs7XG4gICAgICAgICAgICB0aGlzLnkgKj0gaztcbiAgICAgICAgfSxcblxuICAgICAgICB0cmFuc2ZlcjogZnVuY3Rpb24gKGspIHtcbiAgICAgICAgICAgIHZhciB2ZWMgPSBuZXcgVmVjdG9yKHRoaXMueCwgdGhpcy55KTtcbiAgICAgICAgICAgIHZhciB1bml0VmVjID0gdmVjLnVuaXQoKTtcbiAgICAgICAgICAgIHVuaXRWZWMuc2NhbGVCeShrKTtcblxuICAgICAgICAgICAgcmV0dXJuIHVuaXRWZWM7XG4gICAgICAgIH0sXG5cbiAgICAgICAgcGFyYTogZnVuY3Rpb24gKHUsIHBvc2l0aXZlKSB7XG4gICAgICAgICAgICBpZiAodHlwZW9mKHBvc2l0aXZlKSA9PT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgICAgICAgICBwb3NpdGl2ZSA9IHRydWU7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB2YXIgbGVuZ3RoID0gdGhpcy5sZW5ndGgoKTtcbiAgICAgICAgICAgIHZhciB2ZWMgPSBuZXcgVmVjdG9yKHRoaXMueCwgdGhpcy55KTtcbiAgICAgICAgICAgIGlmIChwb3NpdGl2ZSl7XG4gICAgICAgICAgICAgICAgdmVjLnNjYWxlQnkodSAvIGxlbmd0aCk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHZlYy5zY2FsZUJ5KC11IC8gbGVuZ3RoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiB2ZWM7XG4gICAgICAgIH0sXG5cbiAgICAgICAgcHJvamVjdDogZnVuY3Rpb24gKHZlYykge1xuICAgICAgICAgICAgcmV0dXJuIHZlYy5wYXJhKHRoaXMucHJvamVjdGlvbih2ZWMpKTtcbiAgICAgICAgfSxcbiAgICB9O1xuXG4gICAgVmVjdG9yLmFkZCA9IGZ1bmN0aW9uIChhcnIpIHtcbiAgICAgICAgdmFyIHZlY3RvclN1bSA9IG5ldyBWZWN0b3IoMCwgMCk7XG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgYXJyLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICB2YXIgdmVjdG9yID0gYXJyW2ldO1xuICAgICAgICAgICAgdmVjdG9yU3VtLmluY3JlbWVudEJ5KHZlY3Rvcik7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHZlY3RvclN1bTtcbiAgICB9O1xuXG4gICAgVmVjdG9yLmFuZ2xlQmV0d2VlbiA9IGZ1bmN0aW9uICh2ZWMxLCB2ZWMyKSB7XG4gICAgICAgIHJldHVybiBNYXRoLmFjb3ModmVjMS5kb3RQcm9kdWN0KHZlYzIpIC8gKHZlYzEubGVuZ3RoKCkgKiB2ZWMyLmxlbmd0aCgpKSk7XG4gICAgfTtcblxuICAgIHdpbmRvdy5WZWN0b3IgPSBWZWN0b3I7XG59ICh3aW5kb3cpKTtcbiJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==
