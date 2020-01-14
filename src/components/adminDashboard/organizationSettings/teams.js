import React from 'react';
import axios from 'axios';
import RightContentCard from '../../common/RightContentCard';
import ManageModal from '../../manageForms/ManageModal';
import DeleteModal from '../../common/DeleteModal';
import TeamsTable from './teamsTable';
import TeamList from './teamList';

/* eslint-disable camelcase */

export default class Teams extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      popUpPage: false,
      teams: [],
      selected_teams: [],
      selected: [],
      is_superuser: '',
      openModal: false,
      teams_id: '',
    };
  }

  componentDidMount() {
    const { id } = this.props;
    axios
      .get(`/fv3/api/manage-teams/${id}/`)
      .then(res => {
        this.setState({
          selected_teams: res.data.selected_teams,
          teams: res.data.teams,
          is_superuser: res.data.is_superuser,
          // is_superuser: false,
        });
      })
      .catch();
  }

  handleChange = () => {
    const {
      props: { id },
      state: { is_superuser },
    } = this;
    if (is_superuser) {
      this.setState({
        popUpPage: true,
      });
    } else {
      this.props.history.push(`/create-team/${id}`);
    }
  };

  handleClosePopup = () => {
    this.setState({
      popUpPage: false,
    });
  };

  changeHandler = e => {
    const { id, checked, value } = e.target;

    if (checked) {
      this.setState(prevState => ({
        selected: [...prevState.selected, JSON.parse(value)],
      }));
    }

    if (!checked) {
      this.setState(preveState => ({
        selected: preveState.selected.filter(
          region => region !== JSON.parse(value),
        ),
      }));
    }
  };

  handleSaveForm = () => {
    const { id } = this.props;
    const body = { team_ids: this.state.selected };
    axios
      .post(`/fv3/api/manage-teams/${id}/`, body)
      .then(res => {
        if (res.status === 200) {
          this.setState({
            popUpPage: false,
            selected_teams: res.data,
          });
        }
      })
      .catch(err => {});
  };

  openDelete = teams_id => {
    this.setState(prevState => ({
      openModal: !prevState.openModal,
      teams_id,
    }));
  };

  handleConfirm = () => {
    const { selected_teams, teams_id } = this.state;
    const { id } = this.props;
    const body = { team_id: teams_id };

    axios
      .post(`/fv3/api/manage-teams/${id}/`, body)
      .then(res => {
        if (res.status === 200) {
          const delet = selected_teams.filter(
            data => teams_id !== data.id,
          );
          this.setState({
            selected_teams: delet,
            openModal: false,
          });
        }
      })
      .catch(() => {
        // console.log(err);
      });
  };

  handleCancle = () => {
    this.setState({
      openModal: false,
    });
  };

  render() {
    const {
      state: {
        popUpPage,
        teams,
        selected_teams,
        is_superuser,
        openModal,
      },
      handleDelete,
      openDelete,
      handleCancle,
      handleConfirm,
    } = this;

    const { id } = this.props;
    return (
      <>
        <RightContentCard
          title="Manage Teams"
          addButton
          toggleModal={this.handleChange}
          buttonName="Add Teams"
        >
          <TeamsTable
            selected_teams={selected_teams}
            openDelete={openDelete}
          />
        </RightContentCard>
        {/* {is_superuser && popUpPage && (
          <Modal
            title="Add teams"
            toggleModal={this.handleClosePopup}
            showButton
            showText="create team"
            url={`/fieldsight/application/#/create-team/${id}`}
          >
            <form className="floating-form">
              <TeamList
                teams={teams}
                selected={this.state.selected}
                changeHandler={this.changeHandler}
              />

              <div className="modal-footer">
                <div className="form-group pull-right no-margin">
                  <button
                    type="button"
                    className="fieldsight-btn"
                    onClick={this.handleSaveForm}
                  >
                    Add
                  </button>
                </div>
              </div>
            </form>
          </Modal>
        )} */}

        {is_superuser && popUpPage && (
          <ManageModal
            title="Add teams"
            toggleModal={this.handleClosePopup}
            showButton
            showText="create team"
            url={`/fieldsight/application/#/create-team/${id}`}
            handleSubmit={this.handleSaveForm}
          >
            <TeamList
              teams={teams}
              selected={this.state.selected}
              changeHandler={this.changeHandler}
            />
          </ManageModal>
        )}

        {openModal && (
          <DeleteModal
            onCancel={handleCancle}
            onConfirm={handleConfirm}
            onToggle={handleCancle}
            title="Warning"
            message="Are u sure u want to delete "
          />
        )}
      </>
    );
  }
}
