"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Controller = void 0;
const index_1 = require("../../utils/index");
const user_dal_1 = require("./user.dal");
const bcrypt_1 = require("bcrypt");
//@ts-ignore
const zipcode_city_distance_1 = __importDefault(require("zipcode-city-distance"));
class UserController {
    constructor() { }
    createWaitList(req) {
        return __awaiter(this, void 0, void 0, function* () {
            const { userType, firstName, lastName, email, socialMediaType, socialMediaUserName } = req.body;
            const waitListData = {
                userType,
                firstName,
                lastName,
                email,
                socialMediaType,
                socialMediaUserName
            };
            const djOfWeek = yield user_dal_1.Dal.createWaitList(waitListData);
            const result = new index_1.VirifiResult(200, 'Your name was successfully added on waitlist');
            return result;
        });
    }
    registerUser(req) {
        return __awaiter(this, void 0, void 0, function* () {
            const { email, password, userType } = req.body;
            if (!email || !password || !userType) {
                throw new index_1.VirifiError(401, 'Missing Parameters');
            }
            //check user in userDB
            const findUser = yield user_dal_1.Dal.findUserByEmail(email);
            if (findUser) {
                throw new index_1.VirifiError(401, 'User Already Exist');
            }
            const passwordHash = yield (0, bcrypt_1.hash)(password, 10);
            const userData = {
                email,
                password: passwordHash,
                userType: userType,
                profileImage: "data:image/jpeg;base64,iVBORw0KGgoAAAANSUhEUgAAADgAAAA4CAYAAACohjseAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAABefSURBVHgBrVpZjBzXdT2vqvfu6enZNMPh1lxMSpQpUbRsKUpskV6QzbKkIE7i/JgKYsAGgojRT34CaAwECGwHsJifBPmxBNuwAyQQhQBekIUULEuWLJFDiVpMDanmNitnunt6r+6qyrnvVVX3yIpIyaxBT29Vr+6567n3tcJNPp4+eqjQQ+yA8uw7beUdcKEOWEBBKbvow4dSFh+KD7tkKasECxXLx0nPwpkHvnH8JG7yoXATDgEFJA55vv8ofP8AYBX4DGURiOej4ym0nB7seBz5hM3P5RECVYEYvixV4VUn+enxz3/zP57CTTh+I4AamJd41Fc4SvkKfDaiEhwRoNPp4aULK3j+rQU0nS5iiTimCjl8fPcU7t4xASsAKc9yja8x+oFgfokvTzoWvv7wN46X8CGPDwVQgHle7FFefpQCFvRCBGTk8/Syl1cbeOH1C5jMJbH1llGkczl4XQfL11ZRbjjoJIZw/75tGOH3cq1GNyiNAI5eY8ZR3lMfBugHBvhvf/WZh2yF71CoCJh4mVhCrED3wjsrNVy8Mo8/vGsnRgsjsLPjmJiague00SwvYX1tCfOra/jFlTb27dyKsWzCCKPUuwDKehYMVFpUqZk/+IcP5ro3DFBbzbUe562OGo1b4oXavSLhKNRarY0fnXoHf37nGMbGJlCY3onU1C6MDIkFe6ivV1C+eh6ry5fQjA3hxMUmPrczj5hthJG4BX3dh6e9NYpO+YQvLOU/0Wp5X3/4ieOVG5HbupGTfvDVQ8VezzpBUEeVvoT/lVxskoQVZkb+/c/ZK5hOE0ithlq9hq5KIJvNwUpm0eo4cD0PVjwFz+Vzdgz7P3Yvzi6sG3DKrG2Sj1nTuIel3xtlWkdT6fjpp//2oeKNyH5dgALOtgmO6d7X9lbRjTU4DctomlkUV1drsJwGyut19FwgnsrwLja67TqU6yCRycNRSbQJtt2oYse2rWhaWQNOaVfUz34Qy0oLKa7qm6/1fVFM2/ETP565PkjruuAsRcuhqPzgBiYeYLK7SZuh9cr1DsE1KXgTE6ND2LV1HFMjSWRjXaCxgmSCgjcW0VmZQ69VQ6dWpgAe8lPb9apWYClZ1FZ2dA8pKSYe1GCcFq1O4rog1fuBswiOtyzqE4OFLbvvOlGaD5Y5fWEZc+/MIePUUbOH+L0Nn1b8zO0TuGP3ZqyslvG/r15BzY9h22QeufwENt37AN64cAn71TyySTvyDNCVfeMXRiA/fFLwo1Ki/5ficXX48MwPS++F4z0tKAnFtqwTvFExumGUKc29rAHd+MHdPLeLVrMDlx98fNLCn9y7B4f378D5uYtYWF7FG+cuYXGti81b9qDd9PDzM2/ThXM6Ht3AHfWhwSGKSxOGVp8FoR/3/Fd0PevpEzNHCu+FJfZeH7ImP24pr6iCAJf0pSIoSruqx38hyFAwi3HT7HSxpaCwWnWwuOBqK+259XYU99yKHtLwRnw0hsbw3KkzUHTTq786g9zQKFRzCZH3SUJRfng3qMAOYV2MVMHzGEJi1QOe332cn/zNdQF+/yufPOJ7/lGEfq8XCmqcCpYecGz9mck+aLJEdHo+xkfHsHfHTjjJYWy947eRRwXJ1Tdx+64p5DaxJIzuwDZ3mbHZQ2okjbm2jVO/msehA1sQMjc18BcEvy5D8tJXfhSrUFEpOfrff/elZz/79z84Pohng4t+58i9tJr3uPJDXZlkorPzQBEOv47uq8y53VpFc814PIaPHbgNX3jwAezfM41YfQm54QI2ffQTiLUWMdK5jIN7d2L3tilkR8dRXVlEeWkhNA/C3Gzp0qCi90oZDiuxjUGXDt/FrG+/21U3AEzErC9LxtRx5hvJQ7BKa803YAJAfojWN8708GfvQi6TwlK5imtX3kD18ll0l89jvXwNi7003jr3DhbX2/AodLtRxtzc2zj9yos4/8Ys7t67WXuCBqP6sacBW0FC06ANcO1VCgNBokOm2IN3dBBT5KLf+eq9Rb/rz6jQLQ1CLhI4imYqgdXUoP5U9HSt1sGuzROYnbuMN5lYkiNbMTW0Cd/6wc9QYWx2HA9VEvC/fsjFbSwh8+td1G2yn2oV3o5tgScEy4U1F2HN1VVCc92ItiplMm1AET0dLv6jtOITh2eerGwAaHcw4ysMMHo/4paDhKnvmqEC+vHQ5WPvVB7/eQZYWGMtvHgJ9UoVD39qH6Y/cgfiySTevnARzVYD55bXUVZZXF0pg+bEpqmxfl1FmEH7dU/LoTk53ZRZVg0owg9TkeHsBc/XVpzZAJAL3W9cw4+4n25afHGJsCYhAq4LhU6nfG+ZWM2QkrWtGKxECqfmO1h3LyA3Po2FxTLyyz2tvOVqHVf5uP3WXejEx/Hy7Bn8xac/imQs8AlNOEOv9wPMKoBopPCtoPZ6Qaa1AhXIR/zGslVkRQ3w+1+574gvbAV9VmI81DNZK4gLP2K/fbCRJYOikc6kMT06jDcXV1Dv1bEdVdyxdy8OHrwH6WQaL738SzxP9z316llUY3lcW29iM1lPpNLA7YIwj6wzGBFReFgqPCmwvtJlg4moYFnx+/npMzFjPetBpfpWQ3+toG3xos9VP7KNJf3BumSe7t41iWfPLZGL2mg4C/j52QWM/tcLyOUymLuyih41XrcSaPfa+NiOceSZmELfNxJ4kcL0/YMYlCzqiaf6gSX1/dWABS3Ne31j3KMRQJLkQ/2OABv6Mj/U0Lu12++8gxrpR98VJ4YQ83pY7Ngk0inctz2O26YKsJMZ3LVjDK9eXMILSy4SlOdPf2efzow6lvu+GYSCxJoNDEij/IGCHyZE+USy7EDr5lvWgdPfPlqwvnvk3kMUsGCA+JFlDJgAQvCV53l9yw2YLMqywRFnczdNYt1h5qw2Hbxd9tCKZ/C1L30GI7vuwBtVoEs+t2/7JLZNTRgBqXJZX6/tGWX5qh8AYUnSAEUOOddz+ZFrsqqWMYxSnS0L9V77gNVD74Dnuuai8LDUBhc1T14ANGA0YW0KOWGod54TY8v/kbEYhvwe2m0Hry/XcfHqMmrz72Dp4jlcWqkio7qYzlq4eq0WpH0/UlcIxg/A6HmNZzxFKzlQuPYY3yQfyReeAPYCLKYCHJBW6365WEB6AyR34+G/67XRcEjEtc5EAF6/zKTx3FvzGE75uH3UQpo37rUcjKVtXL6ygi1DBM6MOTmURJwK+Nbxl/CvJ17HQs0JyEQIQKzl9clEECrREC5UQvDS841VPc8AFTzK9e6McZWC0ZKlv9TWYKpHMESKHDXgo2Ei0h29JsX6S6ySh75YWqN1KphCDRmC2E3SXW/5OFcDvvDJ/ZgcsfCpHZMY+8lZZD2HrCeBTZNpvHzuKpYbPRzYMY17dhQwlokH4EimwxwQxp7vvcsEZpRhQsrVoxQv0AJ7lAMxilg0Bd6PYss0nxuTy+CztlzgUm227a9ereCN+TKqbHjllK3bJtFZbMB3HOwdUewiLEwM57HquNi+ZQw7x7LoNNZQLpdROl9BL5ZGrdHA2YuLWCKVmx7LYc8tOWzLKyRFkXZQDlTfk8IMHsaGH1hTQIrb+prOoWA/dNfmJwZpq2UZgmvbAaEdAKcGmtweFXl2oYbn3l7DxdU6Ol2PnYQLl73dWtvF7ixdjv3het3Hlx+4m7UugVZ5Fa6dwW3bx3DilXO4Vm0RtI1kKoEkG+m0PCdiqLCnXCLtu9KkFewU3T3O+tb3JgxSx4DShVa1VKgMfU7B/qODm2fUAOeOQAQPa3AswUe7B7y54uDUlTrmlmusc90wqZPMm8znuDyPrrI15yPDadqdxTzW1tkapZO4OvcmJm4Zx5V6HC9drLB0xJFNJTExkkcqlWInYussKq7fbHWw2uhi1UtgKJNB1vag0KcX0VAKA9w0ojYGUyz6cINX+0EWCqyqbO0e8+sefja3Bpfvu464Y4yyuLBjMR0zIptL4Vodat/jYIkTtcneGro0d7tZRWOdgg9vxoW5S9hbnIR36gISvEmaHFUPCpkcmkxIPhNEt2uT+tGVOy096niJI8f9xSlsjzV4LxcbAzNK9kGcImiYfdgPHdwyE5EYBG2KWI4+YUcbJcDlag/PX2ygGxJwgnR8X+up0WzpsYMkBJvxEosnWOe6dDuFT0xn8fzLb+N7L67gk7ePY2FhDWNsclvsLJCbRI3XDmdTiMVoyTSv67oE1Y5CTtkxPWrs0f079AxwxDEiQyw/JBkYaGjUhteSpmJ8lHhOcUOW1IuHiIEr1S6ee6euqZLPAt2mpnXcU9NirSxdT0aG4kBMntoqFq1Xo1AvnFvDofvuwR8zuYjVX5l7Df/4k7cxmY1hcs9ukgJLF+iQpkkdy5PSSbKUXCDAGnTVpZVVTRgdfn/LNg6s0IqSjh+0Qb7qG8qTP2JjPfArCPcGosOUDQHcZuZ76TIHuDy7Wq8jxzgRF0pR6zpbsXu37Ti8nqPdQqwv5aZLwWJ87/odXHj9TZx4toNqq4t79t2Cx754D1ZVBj/lBNwORvO9Xo/66mmNxpjgyo11TKZHUG+3ML9URnHLJFrtts68F4Yz2D9seGg44vfDkPKBaOrmq5L94MHNv8UvDoQNSZhMVMDM55ZqKK22tKWIC5Vagy7jYjg/hCZvrq+ifnrMol2ZXGu24cOhwGmC253r4unTVSYLR4M+z8yb9teZXRtIDo+hXGuSlFMZbLmSccatIyBNNk4mErjErmR6vKAndTUOk7O5LNp0472jSX2eZnleYEmvTxIEPM10hurzZn1dKTcmGXE4ATJfabJYO1pT2WyGWS5OSzapyXVNjm3JtlwsRv7Zk0TDhOO65sZZ2yWDAb54Vwa/u4cjfPpLjeFTLrfQqKxi+3jGxBYTiENAosREXBJYT3tCp8sxJKmepNQrBCq5oM6hcpNe1QtCyQ/mphqDDhPDsjwdwP5JGSzPCn6jBRV1D35AvZocMTTaHS1ArValluMYHR7iWHCdJcMxqiCwWtNYTzY6pbCL4LvzwG4S6j/7/D349MFNyLB96HLtfZs4lCoO6WSxb9e0vleP67e1Ij3Um23kWD5qjRZG81lUSP9sBncum9YJbWnlGj3EcFQd+74XuGlovSC7Kn9WnGuWMVUxpvWiPiusNV6vq3mdQy0naZ2OQ+232nQpfkdX6fU8XRoSFMBnsybDXzlf4u/W6WFs3jRJT+pgnn1gjX7W4KJxpnnZMku5ddx321bs3rUF+eEReoC5jwgvG6ZOh8mMMX516RoKrKeLsrdYqaDZrNOVuxH5joh4EItBmat8buaHJ61Hnpyt0PSzZrPDaCFsfjUh4xtNYAWkJuRgWs9SCFdnMW3dbpuPrnZPhzdeKNexg7zz3oO3sS9q4MVfnsWp8w1cbilUGGKvzzMrn55HifVw35iP/ZMFPPbYY0xWSR27jrgowTYY4wtLqygUsrTaGjdPq9r9JX5lgGXaK+Omg0DlmaXlWV3D5Z+r3GOeH8ZeADLoFmylT9bWrTDIYwQxf63MOscS0e7qciLJr0VXrjcbhhdSUGRGOS1bx/JaDT97rYYL6yTkrhlMvbDkczZDV6x38fJzL+Dzu9PY8taP8Lnf+6xWbo8Lyva3JCCJxQbdv0fLyrxVnju8b5sK7Q9mTaWXnCHZuMU6yr3Ipw2T4UECcpKwKiwNBUN5+oOnBG8gmU24Zpw88crCCkZHhnjTNupeE0McNEmScLmwCOfSvR7cqvDdl0s4efo8pmx+ztC66lI4r6fXvOoopBoETEE/sS2O5pXLOPHaebyV2ETQLWbnDgVN61orAo8XOBtfb1BYjpTshLayeJLp9vtlQsejeJrjlB78p2eeiiyo3dTzj/UjL2xwPU1+Y5aZtjVJgsdHOSgq17iT22I9NMHtUZtdal1blUXZqVexmy1TlaXhDFulX/BRc0OmRKAUbZzS35ZL4Oenr+Kff/wa/v1cg268wGTVpms6XL/BhNXF1PgoltbW6b4+Jvm6Q2VLm+YF8plG19Pg9JCMWqalT4YVoc+yY94TPLPiRd2zicI8mbyMF8SK8SSZfpW9XiLOgh/XEzHRsGJhlhon144kPLy50MYKd482WQ42eR1MZJOaiJvQdjXde6Hu4qfXOniZXv3KmsxnuKeRNAlAQqJcb6M4PUFwFb7voZAvYJFx2NbkXum66Wm3HCQopn77MfvrvwZQrEgcxxCYOsxQuXRMjyDSSU7BaMFkOoWxQg7DuTQyTOXiqglaWfjIEKdjDqdaZcc0xCk+anTxNBXiBTMeFWxitoRH0e1lpjqeVnrPsMLrRkZGddyleM38apV1r4XipglatqlLmZRv4btC43QXH5SFiGz7/oafnWzYm4jRiq5YcSAjDRGEPMdIvodIzyqcVJcWrvEGMYyzxRGXajKWsmxnxP+lYb3sxbBGq851KDh3m7qyHx/UWPlvBSDjPGfRs3HJi2PRtTjWZzfBRLWNpaVGV5dzd27dxFarqfNJgjU4RwVLO5dUJrNLg+sFHJpwSxxJPjmIaQNAsSJPfMQPiqdoLMNd1ywtJEkkRStOTxQwOpRBtbZu3JYMRm6Q5pjBEALoVE7j6G4jQcU4XVevZfYRwqbU1NsW3cbxTaMtNbVNvinJbPqWEWweZ21kHR5mgc9mpOOQLsfWNE5W6PK7riQ46Tb0+v7Mu39L82s7vH/5vdnjvN+xcIQhAlJ2PXeUAmyRWEtjWsjnzeYjT06nYpqFSHIQMLoO8XM3YBRdDdiMEvQ0TpmtcBEUAXe1g+0+KfStVgtTk1Pa8nozVAiGLhNxs7sk810OrNyuIegeH77bO/bgN48/9W4877mFbce8Gd55Vti1gJwcStGC0oR29Y16AZkWoCOFIWSYcCS1WyFRp/uGP83qBFxTCDWCOY6cEwv2+kURAlrCQnhtImaa6UariVQmpwdKkpmFIkodlL4xz1CRDCqW07XP7ZXg12feC8t7AhRXJVN4mK5XEi0XmAWF0cSkNbIkdswmZJcgRwm+xtolWVQsFreV2ZQJ+zLfTL18PbHTjqnBxPR6djQ9kD16sYynWQiwtlpBmg1wNp1BknlA2SYLJyhDlpusXjgidL1Sz1GHH37iZOWGAcrxtR/OluhXhzk5LqVsEzuiXUkWHU7LYuy0MxwSNeiaQo5FSHFP7VYwo4uBoZdOLFYwKBLr6vKix4+2Pjfc9BFX7shvaNhZLC6vIpvPaXceGR5mKKS0UoboMS7jj+WjxAb58Jf+5Sel/w/H+/5O5hGC9JV7mF1ASd53pAYxJhqOdPSm0ArxFsomwyftMq6nLesFyARMl+dJLRXwHU+mb3zwvbRDwm/FTSXBiBc4upAbBiN0ZWVlBdmhPFa4a9zmonn2oVkSezKmktPpENzJ0vthsHGd45nZxcrmofgzS43eQyNDuYIU4HF21OIyHgWq0j3FoiYelG57ZMjkhh12f0wSbv0x87Ku0tXSjKskn2XHSDerQZMdWr7TdcxsxRVgWbZrDSwsr2H/9tHZXAq//5Unf1G6nvwKN3gcKhYLl1rrM0OZ5KNyU1u5dE1uQbdMAe5I9oTS7iaW6AUZVM9Ygw1LmddIqpdhVtiY6m0DmE7UNmNyM+gN2jrpPcX6I3yWJNRqN49dqrRmKjxuRO4bBhgeB3dtPtJqNR9nQ1vsOKaF0lYLWikRqusZC4q8cQolD2lY44w3W89aBZ6tuaPkVifIzBviVK61zfkSd6lkskJe/MhrpYXjH0TeDwxQjuJUoei1nSO02uMCzg0aZNczNa0n2Q0CTrGOcnJNAaWexvQoMqyFSlNAAbbCCbcoxQ5/IqZMrZTzOX+pcGp3rInYEzdqtd8YYHgUUii6nj1D97rflZ+f6AIvtc1Qs3TMcMosiYDMWiz9yySTjXu+0rOeJpOUEIieZyYDMfl5s/7NqC+N+DHOQT8UsJsCcPDIxu0jdNsHKeMhJo1CSrgry0hagBFQ+PNIASCxJhbLs85JmWiSAS1VGxwRdis8dZa07ZjtuFLYPjSw8LhpAAcPdtGH8sn4namEdYhdSCGZsIskysW4jqe4dk0CK/Vcp1KutWfrzc4smdCZa+3eLG4CqMHj/wCYyXpLN6ZkaAAAAABJRU5ErkJggg=="
            };
            const user = yield user_dal_1.Dal.createUser(userData);
            const token = yield index_1.JWT.createToken(user._id);
            yield index_1.MailConfig.verifyEmail(email);
            // Logger.info('Got Data');
            const result = new index_1.VirifiResult(200, 'Signup success', { token, user });
            return result;
        });
    }
    setUserSoundPreference(req) {
        return __awaiter(this, void 0, void 0, function* () {
            const { sp1, sp2, sp3, sp4, sp5, sp6, sp7, sp8, sp9, sp10, sp11, sp12 } = req.body;
            const userData = {
                _id: req.user.id,
                sp1,
                sp2,
                sp3,
                sp4,
                sp5,
                sp6,
                sp7,
                sp8,
                sp9,
                sp10,
                sp11,
                sp12
            };
            const user = yield user_dal_1.Dal.updateUserById(userData);
            // Logger.info('Got Data');
            const result = new index_1.VirifiResult(200, 'Update User Sound Preference', { user });
            return result;
        });
    }
    setUserPlug(req) {
        return __awaiter(this, void 0, void 0, function* () {
            const { spotify, soundCloud, youtube } = req.body;
            const userData = {
                _id: req.user.id,
                spotify,
                soundCloud,
                youtube,
                plug: true
            };
            const user = yield user_dal_1.Dal.updateUserById(userData);
            // Logger.info('Got Data');
            const result = new index_1.VirifiResult(200, 'Update Plug', { user });
            return result;
        });
    }
    setUserProfile(req) {
        return __awaiter(this, void 0, void 0, function* () {
            const { djName, djBio } = req.body;
            const userData = {
                _id: req.user.id,
                djName,
                djBio,
                profile: true
            };
            const user = yield user_dal_1.Dal.updateUserById(userData);
            // Logger.info('Got Data');
            const result = new index_1.VirifiResult(200, 'Update Profile', { user });
            return result;
        });
    }
    loginUser(req) {
        return __awaiter(this, void 0, void 0, function* () {
            const { email, password } = req.body;
            if (!email || !password) {
                throw new index_1.VirifiError(401, 'Missing Parameters');
            }
            const user = yield user_dal_1.Dal.findUserByEmail(email);
            if (!user) {
                throw new index_1.VirifiError(401, 'User Not Exist!!!');
            }
            //Password check
            const userPassword = user === null || user === void 0 ? void 0 : user.password;
            const passwordCheck = yield (0, bcrypt_1.compare)(password, userPassword);
            if (!passwordCheck) {
                throw new index_1.VirifiError(403, 'Invalid password.');
            }
            const token = yield index_1.JWT.createToken(user._id);
            const result = new index_1.VirifiResult(200, 'Signin Successful', { token, user });
            return result;
        });
    }
    getUser(req) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield user_dal_1.Dal.findUserById(req.user.id);
            // let profileImage: any;
            // if(user.profileImage){
            //     profileImage = await readFileSync('./public/profileImage/'+user.profileImage)
            // }
            const result = new index_1.VirifiResult(200, 'Get User Data', { user });
            return result;
        });
    }
    updateProfile(req) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // console.log(req.files)
                const { email, spotify, soundCloud, youtube, djBio, djName, rate, zipCode } = req.body;
                let profileImage = "";
                console.log(req.files);
                if (req.files) {
                    console.log("Runnnnnnnnnnnnnnnnnnnnnnnnnn");
                    console.log(req.files.doc.data.toString("base64"));
                    // // var base64str = await imageToBase64(req.files.doc);
                    // // console.log(base64str)
                    // profileImage = moment() + req.files.doc.name;
                    // await req.files.doc.mv('./public/profileImage/'+profileImage);
                    profileImage = "data:image/jpeg;base64," + req.files.doc.data.toString("base64");
                }
                const userData = {
                    _id: req.user._id,
                    email,
                    spotify,
                    soundCloud,
                    youtube,
                    djBio,
                    djName,
                    rate,
                    zipCode
                };
                if (req.files) {
                    userData.profileImage = profileImage;
                }
                //check user in userDB
                const user = yield user_dal_1.Dal.updateUserById(userData);
                if (!user) {
                    throw new index_1.VirifiError(401, 'User not Exist!!');
                }
                const result = new index_1.VirifiResult(200, 'Updated Successfull', { user });
                return result;
            }
            catch (e) {
                console.log(e);
            }
        });
    }
    updatePassword(req) {
        return __awaiter(this, void 0, void 0, function* () {
            const { currentPassword, newPassword, userId } = req.body;
            //check user in userDB
            const user = yield user_dal_1.Dal.findUserById(userId);
            const passwordCorrect = yield (0, bcrypt_1.compare)(currentPassword, user.password);
            if (!passwordCorrect) {
                throw new index_1.VirifiError(401, 'Invalid Password Current password');
            }
            const newPasswordHash = yield (0, bcrypt_1.hash)(newPassword, 10);
            const userData = {
                _id: userId,
                password: newPasswordHash
            };
            const updateUser = yield user_dal_1.Dal.updateUserById(userData);
            const result = new index_1.VirifiResult(200, ' Password Updated Successfull', { user: updateUser });
            return result;
        });
    }
    updateBlockStatus(req) {
        return __awaiter(this, void 0, void 0, function* () {
            const { blockStatus, userId } = req.body;
            const userData = {
                _id: userId,
                blockStatus
            };
            const updateUser = yield user_dal_1.Dal.updateUserById(userData);
            const result = new index_1.VirifiResult(200, ' Block Status Updated Successfull', { user: updateUser });
            return result;
        });
    }
    getDJList(req) {
        return __awaiter(this, void 0, void 0, function* () {
            const dj = yield user_dal_1.Dal.findDJUser();
            const result = new index_1.VirifiResult(200, 'DJ List', { dj });
            return result;
        });
    }
    getUserList(req) {
        return __awaiter(this, void 0, void 0, function* () {
            const dj = yield user_dal_1.Dal.findUsers();
            const result = new index_1.VirifiResult(200, 'User List', { dj });
            return result;
        });
    }
    getDJDetail(req) {
        return __awaiter(this, void 0, void 0, function* () {
            const { userId } = req.params;
            if (!userId) {
                throw new index_1.VirifiError(404, 'Missing Parameters');
            }
            const dj = yield user_dal_1.Dal.findUserById(userId);
            const result = new index_1.VirifiResult(200, 'DJ List', { dj });
            return result;
        });
    }
    getAdminDJDetail(req) {
        return __awaiter(this, void 0, void 0, function* () {
            const { userId } = req.params;
            if (!userId) {
                throw new index_1.VirifiError(404, 'Missing Parameters');
            }
            const dj = yield user_dal_1.Dal.findUserById(userId);
            const result = new index_1.VirifiResult(200, 'DJ', { dj });
            return result;
        });
    }
    getAdminUserDetail(req) {
        return __awaiter(this, void 0, void 0, function* () {
            const { userId } = req.params;
            if (!userId) {
                throw new index_1.VirifiError(404, 'Missing Parameters');
            }
            const user = yield user_dal_1.Dal.findUserById(userId);
            const result = new index_1.VirifiResult(200, 'User', { user });
            return result;
        });
    }
    countTotalUsers(req) {
        return __awaiter(this, void 0, void 0, function* () {
            const count = yield user_dal_1.Dal.countTotalDJAndUser();
            const result = new index_1.VirifiResult(200, 'DJ List', { count });
            return result;
        });
    }
    searchDj(req) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log(req.body);
            const { pricing, rating1, rating2, sp1, sp2, sp3, sp4, sp5, sp6, sp7, sp8, sp9, sp10, sp11, sp12, location } = req.body;
            let searchArray = [];
            let spArray = [];
            let zipArray = [];
            if (req.user.zipCode && location) {
                // console.log(req.user.zipCode)
                const zipCodes = yield zipcode_city_distance_1.default.getRadius(req.user.zipCode, location, "M");
                // const zipCodes = await zipCodeData.getRadius("", 5, "M");
                if (!zipCodes.error) {
                    zipCodes.map((data) => {
                        zipArray.push({ zipCode: data.zipcode });
                    });
                    searchArray.push({ $or: zipArray });
                }
                // console.log(zipArray)
            }
            if (sp1) {
                spArray.push({ sp1: sp1 });
            }
            if (sp2) {
                spArray.push({ sp2: sp2 });
            }
            if (sp3) {
                spArray.push({ sp3: sp3 });
            }
            if (sp4) {
                spArray.push({ sp4: sp4 });
            }
            if (sp5) {
                spArray.push({ sp5: sp5 });
            }
            if (sp6) {
                spArray.push({ sp6: sp6 });
            }
            if (sp7) {
                spArray.push({ sp7: sp7 });
            }
            if (sp8) {
                spArray.push({ sp8: sp8 });
            }
            if (sp9) {
                spArray.push({ sp9: sp9 });
            }
            if (sp10) {
                spArray.push({ sp10: sp10 });
            }
            if (sp11) {
                spArray.push({ sp11: sp11 });
            }
            if (sp12) {
                spArray.push({ sp12: sp12 });
            }
            if (spArray.length > 0) {
                searchArray.push({ $or: spArray });
            }
            if (pricing) {
                searchArray.push({ rate: pricing });
            }
            if (rating1 && rating2) {
                searchArray.push({ avgRating: { $gte: rating1, $lte: rating2 } });
            }
            const dj = yield user_dal_1.Dal.djFilter(searchArray);
            const result = new index_1.VirifiResult(200, 'DJ List', { dj });
            return result;
        });
    }
    searchUserAndDj(req) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log(req.body);
            const { userType, email, firstDate, lastDate, pricing, rating1, rating2, sp1, sp2, sp3, sp4, sp5, sp6, sp7, sp8, sp9, sp10, sp11, sp12 } = req.body;
            let searchArray = [];
            let spArray = [];
            if (sp1) {
                spArray.push({ sp1: sp1 });
            }
            if (sp2) {
                spArray.push({ sp2: sp2 });
            }
            if (sp3) {
                spArray.push({ sp3: sp3 });
            }
            if (sp4) {
                spArray.push({ sp4: sp4 });
            }
            if (sp5) {
                spArray.push({ sp5: sp5 });
            }
            if (sp6) {
                spArray.push({ sp6: sp6 });
            }
            if (sp7) {
                spArray.push({ sp7: sp7 });
            }
            if (sp8) {
                spArray.push({ sp8: sp8 });
            }
            if (sp9) {
                spArray.push({ sp9: sp9 });
            }
            if (sp10) {
                spArray.push({ sp10: sp10 });
            }
            if (sp11) {
                spArray.push({ sp11: sp11 });
            }
            if (sp12) {
                spArray.push({ sp12: sp12 });
            }
            if (spArray.length > 0) {
                searchArray.push({ $or: spArray });
            }
            if (userType) {
                searchArray.push({ userType: userType });
            }
            if (email) {
                searchArray.push({ email: email });
            }
            if (firstDate && lastDate) {
                const newFirstDate = new Date(firstDate);
                const newLastDate = new Date(lastDate);
                searchArray.push({ createdAt: { $gte: newFirstDate, $lt: newLastDate } });
            }
            if (pricing) {
                searchArray.push({ rate: pricing });
            }
            if (rating1 && rating2) {
                searchArray.push({ avgRating: { $gte: rating1, $lte: rating2 } });
            }
            const dj = yield user_dal_1.Dal.djFilter(searchArray);
            const result = new index_1.VirifiResult(200, 'User or DJ List', { dj });
            return result;
        });
    }
}
exports.Controller = new UserController();
//# sourceMappingURL=user.controller.js.map