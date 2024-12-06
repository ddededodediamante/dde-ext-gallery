(function (Scratch) {
    // Made by ddededodediamante

    (async function () {
        let localStorage = window.localStorage;
        var sweetalert2 = localStorage.getItem('sweetalert2');

        if (!sweetalert2) {
            let response = await fetch('https://cdn.jsdelivr.net/npm/sweetalert2@11/dist/sweetalert2.all.min.js');
            if (!response.ok) return;
            let code = await response.text();

            localStorage.setItem('sweetalert2', code);

            sweetalert2 = code;
        }

        const script = document.createElement("script");
        script.textContent = sweetalert2;
        document.body.appendChild(script);
    })();

    class extension {
        constructor() {
            this.defaultConfig = {
                title: 'Title',
                text: 'Description',
                icon: null,
                confirmButtonText: 'OK',
                cancelButtonText: 'Cancel',
                denyButtonText: 'No',
                showConfirmButton: true,
                showCancelButton: false,
                showDenyButton: false,
                allowEscapeKey: true,
                allowOutsideClick: true,
                animation: true
            }

            this.globalConfig = { ...this.defaultConfig };

            this.result = {
                inputText: '',
                confirmed: false,
                denied: false,
                dismissed: false
            };
        }

        getInfo() {
            return {
                id: 'ddeSweetAlert2',
                name: 'SweetAlert2 Extension',
                color1: '#ae64da',
                blocks: [
                    {
                        opcode: 'showAlert',
                        blockType: Scratch.BlockType.COMMAND,
                        text: 'show popup alert',
                        arguments: {
                            TITLE: {
                                type: Scratch.ArgumentType.STRING,
                                defaultValue: 'Hey'
                            },
                            TEXT: {
                                type: Scratch.ArgumentType.STRING,
                                defaultValue: 'Cat'
                            }
                        }
                    },
                    {
                        opcode: 'inputAlert',
                        blockType: Scratch.BlockType.COMMAND,
                        text: 'show input with default: [DEFAULT] placeholder: [PLACEHOLDER]',
                        arguments: {
                            DEFAULT: {
                                type: Scratch.ArgumentType.STRING,
                                defaultValue: 'Default'
                            },
                            PLACEHOLDER: {
                                type: Scratch.ArgumentType.STRING,
                                defaultValue: ''
                            },
                        }
                    },
                    {
                        opcode: 'getInputValue',
                        blockType: Scratch.BlockType.REPORTER,
                        text: 'get text input'
                    },
                    {
                        opcode: 'getAlertResult',
                        blockType: Scratch.BlockType.BOOLEAN,
                        text: 'was alert [RESULT]?',
                        arguments: {
                            RESULT: {
                                type: Scratch.ArgumentType.STRING,
                                menu: 'RESULT'
                            }
                        }
                    },
                    '---',
                    {
                        opcode: 'setIcon',
                        blockType: Scratch.BlockType.COMMAND,
                        text: 'set icon to [ICON]',
                        arguments: {
                            ICON: {
                                type: Scratch.ArgumentType.STRING,
                                menu: 'ICON'
                            }
                        }
                    },
                    {
                        opcode: 'setConfig',
                        blockType: Scratch.BlockType.COMMAND,
                        text: 'set [CONFIG] to [VALUE]',
                        arguments: {
                            CONFIG: {
                                type: Scratch.ArgumentType.STRING,
                                menu: 'CONFIG'
                            },
                            VALUE: {
                                type: Scratch.ArgumentType.STRING,
                                defaultValue: ''
                            }
                        }
                    }
                ],
                menus: {
                    ICON: {
                        acceptReporters: false,
                        items: ['success', 'info', 'question', 'warning', 'error', 'none']
                    },
                    RESULT: {
                        acceptReporters: true,
                        items: ['confirmed', 'dismissed', 'denied']
                    },
                    CONFIG: {
                        acceptReporters: true,
                        items: Object.keys(this.globalConfig)
                            .filter(i => i !== 'icon')
                            .map(v => {
                                return {
                                    value: v,
                                    text: `${v} (${typeof this.globalConfig[v]})`
                                }
                            })
                    }
                }
            };
        }

        async showAlert() {
            const result = await Swal.fire(this.globalConfig);

            this.result.inputText = result.value;
            this.result.confirmed = result.isConfirmed;
            this.result.denied = result.isDenied;
            this.result.dismissed = result.isDismissed;
        }

        async inputAlert(args) {
            const result = await Swal.fire({
                input: "text",
                inputPlaceholder: args.PLACEHOLDER,
                inputValue: args.DEFAULT,
                ...this.globalConfig
            });

            this.result.inputText = result.value;
            this.result.confirmed = result.isConfirmed;
            this.result.denied = result.isDenied;
            this.result.dismissed = result.isDismissed;
        }

        getInputValue() {
            return this.result.inputText;
        }

        getAlertResult(args) {
            if (this.result[args.RESULT] === null) return false;
            return this.result[args.RESULT];
        }

        setIcon(args) {
            if (args.ICON === 'none') this.globalConfig.icon = null;
            this.globalConfig.icon = args.ICON;
        }

        setConfig(args) {
            if (!(args.CONFIG in this.globalConfig)) throw new Error('Invalid configuration');

            let config = this.globalConfig[args.CONFIG];
            let type = typeof config;
            let value;

            if (type === 'boolean') value = Scratch.Cast.toBoolean(args.VALUE);
            else if (type === 'number') value = Scratch.Cast.toNumber(args.VALUE);
            else if (type === 'string') value = Scratch.Cast.toString(args.VALUE);

            this.globalConfig[args.CONFIG] = value;
        }
    }

    Scratch.extensions.register(new extension());
})(Scratch);