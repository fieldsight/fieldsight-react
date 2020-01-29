import React from 'react';
import axios from 'axios';
import RightContentCard from '../../common/RightContentCard';
import ManageModal from '../../manageForms/ManageModal';
import DeleteModal from '../../common/DeleteModal';
import TeamsTable from './teamsTable';
import TeamList from './teamList';
import Loader from '../../common/Loader';
import {
  errorToast,
  successToast,
} from '../../../utils/toastHandler';

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
      loader: false,
      saveLoader: '',
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
          loader: true,
        });
      })
      .catch();
  }

  handleChange = () => {
    const {
      props: { id },
      state: { is_superuser, loader },
    } = this;

    if (is_superuser) {
      this.setState({
        popUpPage: true,
      });
    }

    // } else {
    //   this.props.history.push(`/create-team/${id}`);
    // }
  };

  handleClosePopup = () => {
    this.setState({
      popUpPage: false,
    });
  };

  changeHandler = async e => {
    const { checked, value, id } = e.target;
    await this.setState(prevState => {
      if (checked) {
        const key = 'id';
        return {
          selected: [
            ...prevState.selected,
            { [key]: JSON.parse(id) },
          ],
        };
      }
      if (!checked) {
        return {
          selected: prevState.selected.filter(
            region => region.id !== JSON.parse(id),
          ),
        };
      }
      return null;
    });
  };

  handleSaveForm = () => {
    const {
      props: { id },
      state: { selected },
    } = this;
    const result = selected.map(function(x) {
      return x.id;
    });
    const body = { team_ids: result };
    this.setState({
      saveLoader: false,
    });

    axios
      .post(`/fv3/api/manage-teams/${id}/`, body)
      .then(res => {
        if (res.status === 200) {
          successToast('Manage Teams', 'created');
          this.setState(State => ({
            saveLoader: !State.saveLoader,
            popUpPage: false,
            selected_teams: res.data,
          }));
        }
      })
      .catch(err => {
        const error = err.response.data;
        Object.entries(error).map(([key, value]) => {
          return errorToast(`${value}`);
        });
      });
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
          successToast(res.data.detail);
          const delet = selected_teams.filter(
            data => teams_id !== data.id,
          );
          this.setState({
            selected_teams: delet,
            openModal: false,
          });
        }
      })
      .catch(err => {
        const error = err.response.data;
        Object.entries(error).map(([key, value]) => {
          return errorToast(`${value}`);
        });
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
        selected,
        loader,
        saveLoader,
      },
      openDelete,
      handleCancle,
      handleConfirm,
    } = this;

    const { id } = this.props;
    return (
      <>
        {saveLoader === false && <Loader />}

        <RightContentCard
          title="Manage Teams"
          addButton
          toggleModal={this.handleChange}
          // buttonName="Add Teams"
        >
          <TeamsTable
            selected_teams={selected_teams}
            openDelete={openDelete}
            loader={loader}
          />
        </RightContentCard>

        {is_superuser && popUpPage && (
          <ManageModal
            title="Add teams"
            toggleModal={this.handleClosePopup}
            showButton
            showText="Create Team"
            url={`/fieldsight/application/#/create-team/${id}`}
            handleSubmit={this.handleSaveForm}
          >
            <TeamList
              teams={teams}
              selected={selected}
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
            message="Are u sure you want to remove?"
          />
        )}
      </>
    );
  }
}
