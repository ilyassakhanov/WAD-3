new Vue({
	el: "#app",
	data: {
		id: 0,
		txt: '',
		date: new Date().toISOString().slice(0, 10) // data from index.html
	},
	mounted() {// called during lifecycle of Vue instance
		this.focus();// runs every time application is loaded
		window.addEventListener('beforeunload', this.update);// before you close the window
		window.addEventListener('blur', this.update);// runs when you unforcus from window
		window.addEventListener('resize', this.focus);

		if (window.location.pathname.length > 1) {
			this.id = window.location.pathname; // if a user wants to load already existing document
			this.load();
		} else {
			this.create(); // if a user is accessing without id ;; creates a new id
		}
	},
	methods: { // your own functions
		async create() {// calling router post without id, creates a new document

			const url = `${window.location.origin}/api/`; // formatting url

			try {
				let response = await fetch(url, {
					method: 'POST',
					headers: {
						'Content-Type': 'application/json', //communticating in json only
						'Accept': 'application/json'
					}
				});

				if (response.status == 200) {
					this.id = await response.json();// retieve id from response
					window.history.pushState({}, null, this.id);// push id from url
				} else if (response.status == 404) {
					alert('Document not found: ' + response.status);
				} else if (response.status == 400) {
					alert('Server error caught: ' + response.status);
				} else {
					alert('Response error: ' + response.status);
				}

			} catch (e) {
				alert(e);
			}
		},
		async load() {

			const url = `${window.location.origin}/api/${this.id}`; //retrieving existing document

			try {
				let response = await fetch(url, {
					method: 'GET',
					headers: {
						'Content-Type': 'application/json',
						'Accept': 'application/json'
					}
				});

				if (response.status == 200) {
					let result = await response.json();
					console.log(result);
					this.txt = result.txt;
					this.date = result.date;
				} else if (response.status == 404) {
					alert('Document not found: ' + response.status);
				} else if (response.status == 400) {
					alert('Server error caught: ' + response.status);
				}
				else {
					alert('Response error: ' + response.status);
				}

			} catch (e) {
				alert(e);
			}
		},
		async update() { //updates already existing document

			const url = `${window.location.origin}/api/${this.id}`;

			try {
				let response = await fetch(url, {
					method: 'PATCH',
					body: JSON.stringify({ txt: this.txt }), // sending updated text to the body
					headers: {
						'Content-Type': 'application/json',
						'Accept': 'application/json'
					}
				});
				if (response.status == 200) {
				} else if (response.status == 404) {
					alert('Document not found: ' + response.status);
				} else if (response.status == 400) {
					alert('Server error caught: ' + response.status);
				} else {
					alert('Response error: ' + response.status);
				}

			} catch (e) {
				alert(e);
			}
		},
		focus(event) {// will keep text area in focus
			this.$nextTick(() => this.$refs.textarea.focus()); // vue uses for constantly occuring things, little cosmetics
		}
	},
	computed: { //functions that can be use in index.html
		markdown() {
			return marked(this.txt);
		},
		characters() {
			return this.txt.length;
		},
		words() {
			if (this.txt.length == 0) {
				return 0;
			} else {
				return this.txt.trim().split(' ').length;
			}
		},
		created() {
			console.log(this)
			return this.date; //TBD doesn't retuen anything
		}
		// Add one more method for words
	}
});
