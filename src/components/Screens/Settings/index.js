import preact from 'preact';
import linkState from 'linkstate';
import $ from 'cash-dom';
import Functions from '../../../helpers/Functions';
import './style.scss';

export default class Settings extends preact.Component {
    constructor() {
        super();
        this.state = {
            saving: false,
            formData: {},
            settings: window.appGlobals.components.home.state.settings
        };

        // Iterate over all the settings

        $.each(Object.keys(this.state.settings), (settingKey) => {
            this.state.formData[settingKey] = this.state.settings[settingKey].value;
        });
    }

    /**
     * Handles form submission, saves settings
     * @param  {object} e The event object
     * @return void
     */
    handleForm(e) {
        e.preventDefault();
        if (!this.state.saving) {
            this.setState({ saving: true });
            window.appGlobals.components.home.saveSettings(this.state.formData);
            $.each(Object.keys(this.state.formData), (key) => {
                Functions.storageSet(key, this.state.formData[key], 60 * 60 * 24 * 365);
                if (key == 'theme') {
                    window.appGlobals.components.app.saveTheme(this.state.formData[key]);
                }
            });
            setTimeout(() => {
                this.setState({ saving: false });
            }, 500);
        }
    }

    render(props, state) {
        return (
            <section className="body__content">
                <div className="body__inner">
                    <h1 className="body__title">Settings</h1>
                    <form className="settings__form" onSubmit={(e) => this.handleForm(e)}>
                        {Object.keys(state.settings).map((settingKey) => (
                            <div className="settings__setting" key={settingKey}>
                                {state.settings[settingKey].type == 'select' &&
                                    <div className="settings__field">
                                        <label htmlFor={settingKey}>{ state.settings[settingKey].label }</label>
                                        <select id={settingKey} onInput={linkState(this, `formData.${settingKey}`)}>
                                            {state.settings[settingKey].options.map((option) => (
                                                <option value={option.value} selected={state.formData[settingKey] == option.value} key={option.value}>{ option.label }</option>
                                            ))}
                                        </select>
                                    </div>
                                }
                            </div>
                        ))}
                        <div className="settings__field settings__field--right">
                            <button type="submit">{ (state.saving) ? 'Saving' : 'Save' }</button>
                        </div>
                    </form>
                </div>
            </section>
        );
    }
}
