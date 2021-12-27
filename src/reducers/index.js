import { combineReducers } from 'redux';

import initialized from './initialized';
import theme from './theme';
import coreInfo from './coreInfo';
import settings from './settings';
import ui from './ui';
import invoiceDrafts from './invoiceDrafts';
import invoices from './invoices';
import modals from './modals';
import user from './user';
import addressBook from './addressBook';
import form from './form';

export default function createReducer() {
  return combineReducers({
    initialized,
    theme,
    coreInfo,
    settings,
    ui,
    invoiceDrafts,
    invoices,
    modals,
    user,
    addressBook,
    form,
  });
}
